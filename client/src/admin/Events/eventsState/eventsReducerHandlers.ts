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
  name: 'avatar' | 'photos';
}

export interface EventsState {
  tableRows: TableRowType[] | null;
  profile: ProfileType | null;
  copyProfile: ProfileType | null;
  changedProfile: Partial<ProfileType>;
  mediaFiles: MediaFile[];
  popup: string | null;
  editMode: boolean;
  eventsList: string[] | null;
}

export enum EventsStrAction {
  SetEventsState = 'SetEventsState',
  SaveMediaFiles = 'SaveMediaFiles',
  DeleteOneMediaFile = 'DeleteOneMediaFile',
  ProfileOnChange = 'ProfileOnChange',
  RestoreProfile = 'RestoreProfile',
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

export interface SetEventsState {
  type: EventsStrAction.SetEventsState;
  payload: Partial<EventsState>
}
export const setEventsState = (
  state: EventsState,
  changes: SetEventsState['payload']
) => {
  return {
    ...state,
    ...changes,
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

export interface DeleteOneMediaFile {
  type: EventsStrAction.DeleteOneMediaFile;
  payload: { name: string };
}
export const deleteOneMediaFile = (
  state: EventsState,
  { name }: DeleteOneMediaFile['payload'],
) => {
  return {
    ...state,
    mediaFiles: state.mediaFiles.map((mediaFile) => {
      return {
        ...mediaFile,
        files: mediaFile.files.filter(file => file.name !== name)
      }
    }).filter(mediaFile => !!mediaFile.files.length),
  };
};

export interface SaveImgs {
  type: EventsStrAction.SaveImgs;
  payload: { firebaseUrls: string[]; fileInputName: string };
}
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

export type EventsReducerActions =
  | ProfileOnChange
  | SaveMediaFiles
  | DeleteOneMediaFile
  | RestoreProfile
  | SetEventsState
  | SelectTableRow
  | SaveImgs
  | SwitchSwitch;
