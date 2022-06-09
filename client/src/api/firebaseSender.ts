import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
const references: any[] = [];

interface FirebaseSender {
  ownerId: string | null;
  files: EventsState['files'];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  fileInputName: EventsState['fileInputName'];
  adminDispatch: Dispatch<AdminReducerActions>;
}

export async function firebaseSender({
  files,
  ownerId,
  fileInputName,
  isFileInputMultiple,
  adminDispatch,
}: FirebaseSender) {
  if (!files) return;
  try {
    setIsFetching(adminDispatch, true);
    if (!isFileInputMultiple) {
      const desertRef = ref(storage, `img/${ownerId}/${fileInputName}/*`);
      await deleteObject(desertRef)
      return
    }
    await Promise.all(
      files.map((file) => {
        console.log(file);
        const id = uuidv4();
        const storageRef = ref(
          storage,
          `img/${ownerId}/${fileInputName}/${id}`,
        );
        references.push(storageRef);
        return uploadBytes(storageRef, file);
      }),
    );
    return await Promise.all(
      references.map((reference) => getDownloadURL(reference)),
    );
  } catch (err) {
    console.log(err);
    saveOperationResult(adminDispatch, {
      status: 'error',
      message: 'files did not update',
      field: null,
      logout: false,
    });
  } finally {
    setIsFetching(adminDispatch, false);
  }
}
