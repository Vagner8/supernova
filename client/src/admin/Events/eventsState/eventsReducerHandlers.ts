import { UseFetchUserByIdResponse } from 'api/users/useFetchUserById';
import { EventsState } from './eventsReducer';

export type ProfilesType = UseFetchUserByIdResponse;
export type FileInputName = keyof ProfilesType['imgs'];

export enum EventsStrAction {
  SavePopup = 'SavePopup',
  SwitchEditMode = 'SwitchEditMode',
  SaveFiles = 'SaveFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
  SaveEventsList = 'SaveEventsList',
  SaveProfile = 'SaveProfile',
  ProfileOnChange = 'ProfileOnChange',
  SaveProfileCopy = 'SaveProfileCopy',
  SaveRows = 'SaveRows',
  RestoreProfile = 'RestoreProfile',
  CleanupProfile = 'CleanPoints',
  SelectRow = 'SelectRow',
}

export interface ProfileOnChange {
  type: EventsStrAction.ProfileOnChange;
  payload: { name: string; value: string; pointName: keyof ProfilesType };
}
export const profileOnChange = (
  state: EventsState,
  { name, value, pointName }: ProfileOnChange['payload'],
) => {
  if (!state.profile) return state;
  if (pointName === '_id') return state;
  return {
    ...state,
    profile: {
      ...state.profile,
      [pointName]: {
        ...state.profile[pointName],
        [name]: value,
      },
    },
    changedProfile: {
      ...state.changedProfile,
      [pointName]: {
        ...state.profile[pointName],
        [name]: value,
      },
    },
  };
};

export interface SelectRow {
  type: EventsStrAction.SelectRow;
  payload: { rowId: string; select: boolean };
}
export const selectRow = (
  state: EventsState,
  { rowId, select }: SelectRow['payload'],
) => {
  if (!state.rows) return state;
  return {
    ...state,
    rows: state.rows.map((row) => {
      if (rowId === row._id) {
        row.selected = select;
        return row;
      }
      return row;
    }),
  };
};

export interface CleanupProfile {
  type: EventsStrAction.CleanupProfile;
}
export const cleanupProfile = (state: EventsState) => {
  return {
    ...state,
    copyProfile: null,
    changedProfile: null,
    profile: null,
    files: null,
    editMode: false,
  };
};

export interface SaveFiles {
  type: EventsStrAction.SaveFiles;
  payload: {
    files: File[];
    isFileInputMultiple: boolean;
    fileInputName: FileInputName;
  };
}
export const saveFiles = (
  state: EventsState,
  { files, isFileInputMultiple, fileInputName }: SaveFiles['payload'],
) => {
  return {
    ...state,
    files,
    isFileInputMultiple,
    fileInputName,
  };
};

export interface DeleteOneFile {
  type: EventsStrAction.DeleteOneFile;
  payload: { fileName: string };
}
export const deleteOneFile = (
  state: EventsState,
  { fileName }: DeleteOneFile['payload'],
) => {
  if (!state.files) return state;
  return {
    ...state,
    files: state.files.filter((file) => file.name !== fileName),
  };
};

interface RestoreProfile {
  type: EventsStrAction.RestoreProfile;
}

interface SaveRows {
  type: EventsStrAction.SaveRows;
  payload: { rows: EventsState['rows'] };
}

interface SavePopup {
  type: EventsStrAction.SavePopup;
  payload: { popup: EventsState['popup'] };
}

interface SwitchEditMode {
  type: EventsStrAction.SwitchEditMode;
  payload: { editMode: EventsState['editMode'] };
}

interface SaveProfile {
  type: EventsStrAction.SaveProfile;
  payload: { profile: ProfilesType };
}

interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { newEventsList: EventsState['eventsList'] };
}

interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

interface SaveProfileCopy {
  type: EventsStrAction.SaveProfileCopy;
}

export type EventsReducerActions =
  | SavePopup
  | SwitchEditMode
  | SaveProfile
  | ProfileOnChange
  | SaveEventsList
  | SaveFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SaveProfileCopy
  | SaveRows
  | RestoreProfile
  | CleanupProfile
  | SelectRow;