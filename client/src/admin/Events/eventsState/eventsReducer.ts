import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { Reducer } from 'react';
import {
  cleanupProfile,
  deleteOneFile,
  EventsReducerActions,
  EventsStrAction,
  FileInputName,
  profileOnChange,
  ProfilesType,
  saveFiles,
  saveImgs,
  selectTableRow,
} from './eventsReducerHandlers';

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

export interface EventsState {
  tableRows: UseFetchUsersForTableResponse[] | null;
  profile: ProfilesType | null;
  copyProfile: ProfilesType | null;
  changedProfile: Partial<ProfilesType> | null;
  popup: string | null;
  editMode: boolean;
  eventsList: null | string[];
  files: File[] | null;
  isFileInputMultiple: boolean;
  fileInputName: FileInputName | null;
}

export const eventsInitState: EventsState = {
  popup: null,
  editMode: false,
  copyProfile: null,
  profile: null,
  changedProfile: null,
  eventsList: null,
  files: null,
  isFileInputMultiple: false,
  fileInputName: null,
  tableRows: null,
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SaveImgs: {
      return saveImgs(state, action.payload)
    }
    case EventsStrAction.SelectTableRow: {
      return selectTableRow(state, action.payload);
    }
    case EventsStrAction.CleanupProfile: {
      return cleanupProfile(state);
    }
    case EventsStrAction.RestoreProfile: {
      return { ...state, profile: state.copyProfile || state.profile };
    }
    case EventsStrAction.SaveTableRows: {
      return { ...state, tableRows: action.payload.tableRows };
    }
    case EventsStrAction.SavePopup: {
      return { ...state, popup: action.payload.popup };
    }
    case EventsStrAction.SwitchEditMode: {
      return { ...state, editMode: action.payload.editMode };
    }
    case EventsStrAction.SaveProfile: {
      return { ...state, profile: action.payload.profile };
    }
    case EventsStrAction.SaveProfileCopy: {
      return { ...state, copyProfile: state.profile };
    }
    case EventsStrAction.ProfileOnChange: {
      return profileOnChange(state, action.payload)
    }
    case EventsStrAction.SaveEventsList: {
      return { ...state, eventsList: action.payload.newEventsList };
    }
    case EventsStrAction.SaveFiles: {
      return saveFiles(state, action.payload)
    }
    case EventsStrAction.DeleteOneFile: {
      return deleteOneFile(state, action.payload)
    }
    case EventsStrAction.DeleteAllFiles: {
      return { ...state, files: null };
    }
    default:
      return state;
  }
};
