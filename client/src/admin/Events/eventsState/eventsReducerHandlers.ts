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
  SaveTableRows = 'SaveTableRows',
  RestoreProfile = 'RestoreProfile',
  CleanupProfile = 'CleanPoints',
  SelectTableRow = 'SelectTableRow',
  SaveImgs = 'SaveImgs',
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
  if (pointName === 'created') return state;
  if (pointName === 'userId') return state;
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

export interface SelectTableRow {
  type: EventsStrAction.SelectTableRow;
  payload: { rowId: string; select: boolean };
}
export const selectTableRow = (
  state: EventsState,
  { rowId, select }: SelectTableRow['payload'],
) => {
  if (!state.tableRows) return state;
  return {
    ...state,
    rows: state.tableRows.map((row) => {
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

export interface SaveImgs {
  type: EventsStrAction.SaveImgs;
  payload: { firebaseUrls: string[], fileInputName: string };
}
export const saveImgs = (
  state: EventsState,
  { firebaseUrls, fileInputName }: SaveImgs['payload']
) => {
  if (!state.profile?.imgs) return state
  return {
    ...state,
    profile: {
      ...state.profile,
      imgs: {
        ...state.profile.imgs,
        [fileInputName]: firebaseUrls
      }
    }
  }
}

export interface RestoreProfile {
  type: EventsStrAction.RestoreProfile;
}

export interface SaveTableRows {
  type: EventsStrAction.SaveTableRows;
  payload: { tableRows: EventsState['tableRows'] };
}
 
export interface SavePopup {
  type: EventsStrAction.SavePopup;
  payload: { popup: EventsState['popup'] };
}

export interface SwitchEditMode {
  type: EventsStrAction.SwitchEditMode;
  payload: { editMode: EventsState['editMode'] };
}

export interface SaveProfile {
  type: EventsStrAction.SaveProfile;
  payload: { profile: ProfilesType };
}

export interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { newEventsList: EventsState['eventsList'] };
}

export interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

export interface SaveProfileCopy {
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
  | SaveTableRows
  | RestoreProfile
  | CleanupProfile
  | SelectTableRow
  | SaveImgs;
