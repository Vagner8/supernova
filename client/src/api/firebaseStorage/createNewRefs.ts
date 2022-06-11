// eslint-disable-next-line import/named
import { ref, StorageReference } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from './firebaseConfig';

interface CreateNewRefs {
  ({ files, path }: { files: File[]; path: string }): [
    StorageReference,
    File,
  ][];
}

export const createNewRefs: CreateNewRefs = ({ files, path }) =>
  files.map((file) => [ref(storage, `${path}/${uuidv4()}`), file]);