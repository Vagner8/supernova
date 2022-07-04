import { UseFetchUserByIdResponse } from 'api/users/useFetchUserById';
import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { Dispatch, Reducer } from 'react';

type PointsType = UseFetchUserByIdResponse;
export type FileInputName = keyof PointsType['imgs'];

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

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

interface SelectRow {
  type: EventsStrAction.SelectRow;
  payload: { rowId: string, select: boolean };
}

interface CleanupPoints {
  type: EventsStrAction.CleanupPoints;
}

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

interface PointsOnChange {
  type: EventsStrAction.PointsOnChange;
  payload: { name: string; value: string; pointName: keyof PointsType };
}

interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { newEventsList: EventsState['eventsList'] };
}

interface SaveFiles {
  type: EventsStrAction.SaveFiles;
  payload: {
    files: File[];
    isFileInputMultiple: boolean;
    fileInputName: FileInputName;
  };
}

interface DeleteOneFile {
  type: EventsStrAction.DeleteOneFile;
  payload: { fileName: string };
}

interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

interface SaveCopyOfPoints {
  type: EventsStrAction.SaveCopyOfPoints;
}

interface Row extends UseFetchUsersForTableResponse {
  selected?: boolean;
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
  rows: Row[] | null;
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
      if (!state.rows) return state;
      return {
        ...state,
        rows: state.rows.map((row) => {
          if (action.payload.rowId === row._id) {
            row.selected = action.payload.select
            return row;
          }
          return row;
        }),
      };
    }
    case EventsStrAction.CleanupPoints: {
      return {
        ...state,
        copyPoints: null,
        changedPoints: null,
        points: null,
        files: null,
        editMode: false,
      };
    }
    case EventsStrAction.RestorePoints: {
      return { ...state, points: state.copyPoints };
    }
    case EventsStrAction.SaveRows: {
      return {
        ...state,
        rows: action.payload.rows,
      };
    }
    case EventsStrAction.SavePopup: {
      return {
        ...state,
        popup: action.payload.popup,
      };
    }
    case EventsStrAction.SwitchEditMode: {
      return {
        ...state,
        editMode: action.payload.editMode,
      };
    }
    case EventsStrAction.SavePoints: {
      return {
        ...state,
        points: action.payload.points,
      };
    }
    case EventsStrAction.SaveCopyOfPoints: {
      return {
        ...state,
        copyPoints: state.points,
      };
    }
    case EventsStrAction.PointsOnChange: {
      if (!state.points) return state;
      const { name, value, pointName } = action.payload;
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
    }
    case EventsStrAction.SaveEventsList: {
      return {
        ...state,
        eventsList: action.payload.newEventsList,
      };
    }
    case EventsStrAction.SaveFiles: {
      return {
        ...state,
        files: action.payload.files,
        isFileInputMultiple: action.payload.isFileInputMultiple,
        fileInputName: action.payload.fileInputName,
      };
    }
    case EventsStrAction.DeleteOneFile: {
      if (!state.files) return state;
      return {
        ...state,
        files: state.files.filter(
          (file) => file.name !== action.payload.fileName,
        ),
      };
    }
    case EventsStrAction.DeleteAllFiles: {
      return {
        ...state,
        files: null,
      };
    }
    default:
      return state;
  }
};

export const savePopup = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  popup: EventsState['popup'],
) => {
  eventsDispatch({
    type: EventsStrAction.SavePopup,
    payload: { popup },
  });
};

export const savePoints = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  points: PointsType,
) => {
  eventsDispatch({
    type: EventsStrAction.SavePoints,
    payload: { points },
  });
};

export const saveCopyOfPoints = (
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  eventsDispatch({ type: EventsStrAction.SaveCopyOfPoints });
};

export const pointsOnChange = ({
  eventsDispatch,
  name,
  value,
  pointName,
}: {
  eventsDispatch: Dispatch<EventsReducerActions>;
  name: string;
  value: string;
  pointName: keyof EventsState['points'];
}) => {
  eventsDispatch({
    type: EventsStrAction.PointsOnChange,
    payload: { name, value, pointName },
  });
};

export const saveEventsList = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  newEventsList: EventsState['eventsList'],
) => {
  eventsDispatch({
    type: EventsStrAction.SaveEventsList,
    payload: { newEventsList },
  });
};

export const saveFiles = ({
  eventsDispatch,
  files,
  isFileInputMultiple,
  fileInputName,
}: {
  eventsDispatch: Dispatch<EventsReducerActions>;
  files: File[];
  isFileInputMultiple: boolean;
  fileInputName: FileInputName;
}) => {
  eventsDispatch({
    type: EventsStrAction.SaveFiles,
    payload: { files, fileInputName, isFileInputMultiple },
  });
};

export const deleteOneFile = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  fileName: string,
) => {
  eventsDispatch({
    type: EventsStrAction.DeleteOneFile,
    payload: { fileName },
  });
};

export const deleteAllFiles = (
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  eventsDispatch({
    type: EventsStrAction.DeleteAllFiles,
  });
};

export const switchEditMode = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  editMode: EventsState['editMode'],
) => {
  eventsDispatch({
    type: EventsStrAction.SwitchEditMode,
    payload: { editMode },
  });
};

export const saveUsers = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  rows: EventsState['rows'],
) => {
  eventsDispatch({
    type: EventsStrAction.SaveRows,
    payload: { rows },
  });
};
