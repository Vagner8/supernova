import { Reducer } from 'react';
import {
  setEventsState,
  deleteOneMediaFile,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
  profileOnChange,
  saveMediaFiles,
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
    case EventsStrAction.SelectTableRow: {
      return selectTableRow(state, action.payload);
    }
    case EventsStrAction.SetEventsState: {
      return setEventsState(state, action.payload);
    }
    case EventsStrAction.RestoreProfile: {
      return { ...state, profile: state.copyProfile || state.profile };
    }
    case EventsStrAction.ProfileOnChange: {
      return profileOnChange(state, action.payload);
    }
    case EventsStrAction.SaveMediaFiles: {
      return saveMediaFiles(state, action.payload);
    }
    case EventsStrAction.DeleteOneMediaFile: {
      return deleteOneMediaFile(state, action.payload);
    }
    default:
      return state;
  }
};
