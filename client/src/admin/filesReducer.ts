import { Reducer } from 'react';

export enum FilesStrAction {
  SaveFiles = 'SaveFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
}

interface SaveFiles {
  type: FilesStrAction.SaveFiles;
  payload: { files: File[] };
}

interface DeleteOneFile {
  type: FilesStrAction.DeleteOneFile;
  payload: { fileName: string };
}

interface DeleteAllFiles {
  type: FilesStrAction.DeleteAllFiles;
}

export interface FilesState {
  files: File[] | null;
}

export type FilesReducerActions = SaveFiles | DeleteOneFile | DeleteAllFiles;

export const filesInitState: FilesState = {
  files: null,
};

export const filesReducer: Reducer<FilesState, FilesReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case FilesStrAction.SaveFiles:
      return {
        files: action.payload.files
      }
    case FilesStrAction.DeleteOneFile:
      if (!state.files) return state
      return {
        files: state.files.filter(file => file.name !== action.payload.fileName)
      }
    case FilesStrAction.DeleteAllFiles:
      return {
        files: null
      }
    default:
      return state;
  }
};
