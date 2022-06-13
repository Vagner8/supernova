import { Dispatch } from 'react';
import { AdminReducerActions, setIsFetching } from 'admin/adminReducer';
import { firebaseError } from 'helpers';
import { deleteAllFilesInFolder } from './deleteAllFilesInFolder';
import { downloadFiles } from './downloadFiles';

export enum RootFolder {
  OwnerImg = 'owner-img',
}

interface DownloadFilesFirebase {
  files: File[] | null;
  path: (string | null)[];
  isFileInputMultiple: boolean;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export async function downloadFilesFirebase({
  files,
  path,
  isFileInputMultiple,
  adminDispatch,
}: DownloadFilesFirebase) {
  try {
    setIsFetching(adminDispatch, true);
    if (!files) {
      firebaseError(adminDispatch, 'no files to download');
      return undefined;
    }
    if (path.some((p) => !p)) {
      firebaseError(adminDispatch, 'incorrect path');
      return undefined;
    }
    if (!isFileInputMultiple) {
      await deleteAllFilesInFolder(path.join('/'));
    }
    return await downloadFiles(files, path)
  } catch (err) {
    firebaseError(adminDispatch, 'files did not download');
    console.error(err)
  } finally {
    setIsFetching(adminDispatch, false);
  }
}
