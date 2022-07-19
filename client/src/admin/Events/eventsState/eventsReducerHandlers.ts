import { ProductProfileResponse } from 'admin/ProductProfile/productProfileHooks/useFetchToGetProductProfile';
import { ProductForTableResponse } from 'admin/ProductTable/productTableHooks/useFetchToGetProductsForTable';
import { UserProfileResponse } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { UserForTableResponse } from 'admin/UsersTable/usersTableHooks/useFetchToGetUsersForTable';

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

export type AllPartial<T> = {
  [K in keyof T]?: T[K] extends {} ? AllPartial<T[K]> : T[K];
};

export type ProfileType = UserProfileResponse | ProductProfileResponse;
export type ProfileOnChangeType = Omit<
  ProfileType,
  'itemId' | '_id' | 'created'
>;

export type TableRowType = ProductForTableResponse | UserForTableResponse;
export type TableRowTypeAllFields = ProductForTableResponse &
  UserForTableResponse;
export type TableRowTypeAllKeys = keyof TableRowTypeAllFields;

export interface MediaFile {
  files: File[];
  fileName: 'avatar' | 'photos';
}

export interface EventsState {
  tableRows: TableRowType[] | null;
  profile: ProfileType | null;
  copyProfile: ProfileType | null;
  changedProfile: Partial<ProfileType>;
  mediaFiles: MediaFile[];
  popup: string | null;
  editMode: boolean;
  eventsList: null | string[];
}

export enum EventsStrAction {
  SavePopup = 'SavePopup',
  SwitchEditMode = 'SwitchEditMode',
  SaveMediaFiles = 'SaveMediaFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
  SaveEventsList = 'SaveEventsList',
  SaveProfile = 'SaveProfile',
  ProfileOnChange = 'ProfileOnChange',
  ChangedProfileOnChange = 'ChangedProfileOnChange',
  SaveProfileCopy = 'SaveProfileCopy',
  SaveTableRows = 'SaveTableRows',
  RestoreProfile = 'RestoreProfile',
  CleanupProfile = 'CleanPoints',
  SelectTableRow = 'SelectTableRow',
  SaveImgs = 'SaveImgs',
  SwitchSwitch = 'SwitchSwitch',
}

export interface ProfileOnChange {
  type: EventsStrAction.ProfileOnChange;
  payload: {
    name: string;
    value: string | File[];
    pointName: keyof ProfileOnChangeType;
  };
}
export const profileOnChange = (
  state: EventsState,
  { name, value, pointName }: ProfileOnChange['payload'],
) => {
  if (!state.profile) return state;
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
        ...state.changedProfile[pointName],
        [name]: value,
      },
    },
  };
};

export interface SelectTableRow {
  type: EventsStrAction.SelectTableRow;
  payload: { itemId: string };
}
export const selectTableRow = (
  state: EventsState,
  { itemId }: SelectTableRow['payload'],
) => {
  if (!state.tableRows) return state;
  return {
    ...state,
    tableRows: state.tableRows.map((row) => {
      if (row.itemId === itemId) {
        return {
          ...row,
          selected: !row.selected,
        };
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
    changedProfile: {},
    profile: null,
    mediaFiles: [],
    editMode: false,
  };
};

export interface SaveMediaFiles {
  type: EventsStrAction.SaveMediaFiles;
  payload: MediaFile;
}
export const saveMediaFiles = (
  state: EventsState,
  mediaFile: SaveMediaFiles['payload'],
) => {
  return {
    ...state,
    mediaFiles: [...state.mediaFiles, mediaFile],
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
  return {
    ...state,
    mediaFiles: {
      ...state.mediaFiles.filter(
        (mediaFile) => mediaFile.fileName !== fileName,
      ),
    },
  };
};

export interface SaveImgs {
  type: EventsStrAction.SaveImgs;
  payload: { firebaseUrls: string[]; fileInputName: string };
}
export const saveImgs = (
  state: EventsState,
  { firebaseUrls, fileInputName }: SaveImgs['payload'],
) => {
  if (!state.profile?.imgs) return state;
  return {
    ...state,
    profile: {
      ...state.profile,
      imgs: {
        ...state.profile.imgs,
        [fileInputName]: firebaseUrls,
      },
    },
  };
};

export interface SwitchSwitch {
  type: EventsStrAction.SwitchSwitch;
  payload: { itemId: string };
}
export const switchSwitch = (
  state: EventsState,
  { itemId }: SwitchSwitch['payload'],
) => {
  if (!state.tableRows) return state;
  return {
    ...state,
    tableRows: state.tableRows.map((row) => {
      if (itemId === row.itemId && 'disabled' in row) {
        return {
          ...row,
          disabled: !row.disabled,
        };
      }
      return row;
    }),
  };
};

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
  payload: { profile: ProfileType };
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
  | SaveMediaFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SaveProfileCopy
  | SaveTableRows
  | RestoreProfile
  | CleanupProfile
  | SelectTableRow
  | SaveImgs
  | SwitchSwitch;
