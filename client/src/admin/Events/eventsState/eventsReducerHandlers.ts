import { UseFetchUserByIdResponse } from 'api/users/useFetchUserById';
import { EventsState } from './eventsReducer';

export type PointsType = UseFetchUserByIdResponse;
export type FileInputName = keyof PointsType['imgs'];

export enum EventsStrAction {
  SavePopup = 'SavePopup',
  SwitchEditMode = 'SwitchEditMode',
  SaveFiles = 'SaveFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
  SaveEventsList = 'SaveEventsList',
  SavePoints = 'SavePoints',
  PointsOnChange = 'PointsOnChange',
  SaveCopyOfPoints = 'SaveCopyOfPoints',
  SaveRows = 'SaveRows',
  RestorePoints = 'RestorePoints',
  CleanupPoints = 'CleanPoints',
  SelectRow = 'SelectRow',
}

export interface PointsOnChange {
  type: EventsStrAction.PointsOnChange;
  payload: { name: string; value: string; pointName: keyof PointsType };
}
export const pointsOnChange = (
  state: EventsState,
  { name, value, pointName }: PointsOnChange['payload'],
) => {
  if (!state.points) return state;
  if (pointName === '_id') return state;
  return {
    ...state,
    points: {
      ...state.points,
      [pointName]: {
        ...state.points[pointName],
        [name]: value,
      },
    },
    changedPoints: {
      ...state.changedPoints,
      [pointName]: {
        ...state.points[pointName],
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

export interface CleanupPoints {
  type: EventsStrAction.CleanupPoints;
}
export const cleanupPoints = (state: EventsState) => {
  return {
    ...state,
    copyPoints: null,
    changedPoints: null,
    points: null,
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

interface RestorePoints {
  type: EventsStrAction.RestorePoints;
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

interface SavePoints {
  type: EventsStrAction.SavePoints;
  payload: { points: PointsType };
}

interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { newEventsList: EventsState['eventsList'] };
}

interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

interface SaveCopyOfPoints {
  type: EventsStrAction.SaveCopyOfPoints;
}

export type EventsReducerActions =
  | SavePopup
  | SwitchEditMode
  | SavePoints
  | PointsOnChange
  | SaveEventsList
  | SaveFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SaveCopyOfPoints
  | SaveRows
  | RestorePoints
  | CleanupPoints
  | SelectRow;