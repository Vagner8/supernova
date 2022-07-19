import { Reducer } from 'react';
import {
  cleanupProfile,
  deleteOneMediaFile,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
  profileOnChange,
  saveMediaFiles,
  saveImgs,
  selectTableRow,
  switchSwitch,
} from './eventsReducerHandlers';

export const eventsInitState: EventsState = {
  popup: null,
  editMode: false,
  copyProfile: null,
  profile: null,
  changedProfile: {},
  eventsList: null,
  mediaFiles: [],
  tableRows: null,
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SwitchSwitch: {
      return switchSwitch(state, action.payload);
    }
    case EventsStrAction.SaveImgs: {
      return saveImgs(state, action.payload);
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
      return profileOnChange(state, action.payload);
    }
    case EventsStrAction.SaveEventsList: {
      return { ...state, eventsList: action.payload.newEventsList };
    }
    case EventsStrAction.SaveMediaFiles: {
      return saveMediaFiles(state, action.payload);
    }
    case EventsStrAction.DeleteOneMediaFile: {
      return deleteOneMediaFile(state, action.payload);
    }
    case EventsStrAction.DeleteAllFiles: {
      return { ...state, mediaFiles: [] };
    }
    default:
      return state;
  }
};
