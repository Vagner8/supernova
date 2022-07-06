import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { Reducer } from 'react';
import {
  cleanupPoints,
  deleteOneFile,
  EventsReducerActions,
  EventsStrAction,
  FileInputName,
  pointsOnChange,
  PointsType,
  saveFiles,
  selectRow,
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
  popup: string | null;
  editMode: boolean;
  points: PointsType | null;
  copyPoints: PointsType | null;
  changedPoints: Partial<PointsType> | null;
  eventsList: null | string[];
  files: File[] | null;
  isFileInputMultiple: boolean;
  fileInputName: FileInputName | null;
  rows: UseFetchUsersForTableResponse[] | null;
}

export const eventsInitState: EventsState = {
  popup: null,
  editMode: false,
  copyPoints: null,
  points: null,
  changedPoints: null,
  eventsList: null,
  files: null,
  isFileInputMultiple: false,
  fileInputName: null,
  rows: null,
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SelectRow: {
      return selectRow(state, action.payload);
    }
    case EventsStrAction.CleanupPoints: {
      return cleanupPoints(state);
    }
    case EventsStrAction.RestorePoints: {
      return { ...state, points: state.copyPoints || state.points };
    }
    case EventsStrAction.SaveRows: {
      return { ...state, rows: action.payload.rows };
    }
    case EventsStrAction.SavePopup: {
      return { ...state, popup: action.payload.popup };
    }
    case EventsStrAction.SwitchEditMode: {
      return { ...state, editMode: action.payload.editMode };
    }
    case EventsStrAction.SavePoints: {
      return { ...state, points: action.payload.points };
    }
    case EventsStrAction.SaveCopyOfPoints: {
      return { ...state, copyPoints: state.points };
    }
    case EventsStrAction.PointsOnChange: {
      return pointsOnChange(state, action.payload)
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
