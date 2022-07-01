import {
  AdminReducerActions,
  saveOperationResult,
} from 'admin/adminReducer';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
import { Dispatch, useMemo } from 'react';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useAdminDispatch } from './useAdminDispatch';
import { EventsState } from 'admin/Events/eventsReducer';

const isStringArray = (arr: (string | undefined | null)[]): arr is string[] => {
  return arr.every(item => typeof item === 'string')
}

const firebaseConfig = {
  apiKey: 'AIzaSyDnqMrio0bJ4sHZm6sT3X_T3-Um_vUgUFA',
  authDomain: 'fir-1ad92.firebaseapp.com',
  projectId: 'fir-1ad92',
  storageBucket: 'fir-1ad92.appspot.com',
  messagingSenderId: '213577813183',
  appId: '1:213577813183:web:49d2f53c602b32bb0b8a0a',
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

interface UseFirebaseStorage {
  paths: (string | undefined | null)[];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function useFirebaseStorage({
  paths,
  isFileInputMultiple,
  adminDispatch,
}: UseFirebaseStorage) {
  const adminAction = useAdminDispatch(adminDispatch);
  return useMemo(() => {
    return {
      async download(files: File[]) {
        try {
          adminAction.setIsFetching(true);
          if (!isFileInputMultiple) {
            await this.deleteAllFilesInFolder(paths.join('/'));
          }
          return await this.saveFiles(files);
        } catch (err) {
          saveOperationResult(adminDispatch, {
            status: 'firebase error',
            message: 'bad files download',
          });
        } finally {
          adminAction.setIsFetching(false);
        }
      },

      async saveFiles(files: File[]) {
        try {
          const newRefs = this.createNewRefs(files);
          if (!newRefs) return
          await Promise.all(
            newRefs.map((newRef) =>
              uploadBytes(newRef.storageRef, newRef.file),
            ),
          );
          return await Promise.all(
            newRefs.map((newRef) => getDownloadURL(newRef.storageRef)),
          );
        } catch (err) {
          adminAction.saveOperationResult({
            status: 'firebase error',
            message: 'bad files saving',
          });
        }
      },

      createNewRefs(files: File[]) {
        if (!isStringArray(paths)) return
        return files.map((file) => ({
          storageRef: ref(storage, `${paths.join('/')}/${uuidv4()}`),
          file,
        }));
      },

      async deleteAllFilesInFolder(path: string) {
        try {
          const { items } = await listAll(ref(storage, path));
          const desertRefs = items.map((item) => ref(storage, item.fullPath));
          await Promise.all(
            desertRefs.map((desertRef) => deleteObject(desertRef)),
          );
        } catch (err) {
          adminAction.saveOperationResult({
            status: 'firebase error',
            message: 'bad files deletion',
          });
        }
      },
    };
  }, [adminAction, isFileInputMultiple, paths, adminDispatch]);
}
