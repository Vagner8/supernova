import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  // eslint-disable-next-line import/named
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { Dispatch, useMemo } from 'react';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useAdminDispatch } from '../admin/adminState';
import { EventsState } from 'admin/Events/eventsState';
import { AdminReducerActions } from 'admin/adminState';
import { BaseType } from '../../../common/src/commonTypes';

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
  adminDispatch: Dispatch<AdminReducerActions>;
}

interface NewRefs {
  storageRef: StorageReference;
  file: File;
}

export function useFirebaseStorage({ adminDispatch }: UseFirebaseStorage) {
  const adminAction = useAdminDispatch(adminDispatch);
  return useMemo(() => {
    return {
      async download(mediaFiles: EventsState['mediaFiles'], itemId: string) {
        try {
          adminAction.setAdminState({ isFetching: true });
          const newRefs = this.createNewRefs(mediaFiles, itemId);
          const urls = await this.saveMediaFiles(newRefs);
          return this.parseUrls(urls);
        } catch (err) {
          adminAction.saveOperationResult({
            operationResult: {
              status: 'firebase error',
              message: 'bad files download',
            },
          });
        } finally {
          adminAction.setAdminState({ isFetching: false });
        }
      },

      parseUrls(urls: string[] | undefined) {
        if (!urls) return;
        return urls.reduce<Partial<BaseType['imgs']>>((acc, url) => {
          if (url.match(/mediaFileName_avatar/i)) {
            acc.avatar = [];
            acc.avatar.push(url);
          }
          if (url.match(/mediaFileName_photos/i)) {
            acc.photos = [];
            acc.photos.push(url);
          }
          return acc;
        }, {});
      },

      createNewRefs(mediaFiles: EventsState['mediaFiles'], itemId: string) {
        return mediaFiles.reduce<NewRefs[]>((acc, mediaFile) => {
          mediaFile.files.forEach((file) => {
            acc.push({
              storageRef: ref(
                storage,
                mediaFile.name === 'avatar'
                  ? `mediaFileName_${mediaFile.name}/${itemId}`
                  : `mediaFileName_${mediaFile.name}/${itemId}__${uuidv4()}`,
              ),
              file,
            });
          });
          return acc;
        }, []);
      },

      async saveMediaFiles(newRefs: NewRefs[]) {
        try {
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
            operationResult: {
              status: 'firebase error',
              message: 'bad files saving',
            },
          });
        }
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
            operationResult: {
              status: 'firebase error',
              message: 'bad files deletion',
            },
          });
        }
      },
    };
  }, [adminAction]);
}
