import { UseFetchUserByIdResponse } from 'api/users/useFetchUserById';
import { Dispatch, Reducer } from 'react';
import { ImgsType } from '../../../../common/src/commonTypes';

type PointsType = UseFetchUserByIdResponse;

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

export enum EventsStrAction {
  SwitchEditMode = 'SwitchEditMode',
  SwitchSaveButton = 'SwitchSaveButton',
  SaveFiles = 'SaveFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
  SaveEventsList = 'SaveEventsList',
  SavePoints = 'SavePoints',
  PointsOnChange = 'PointsOnChange',
  SaveCopyOfPoints = 'SaveCopyOfPoints',
}

interface SwitchEditMode {
  type: EventsStrAction.SwitchEditMode;
  payload: { editMode: EventsState['editMode'] };
}

interface SwitchSaveButton {
  type: EventsStrAction.SwitchSaveButton;
  payload: { saveButton: EventsState['saveButton'] };
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
    fileInputName: keyof ImgsType;
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

export interface EventsState {
  editMode: boolean;
  saveButton: boolean;
  copyPoints: PointsType | null;
  points: PointsType | null;
  changedPoints: Partial<PointsType> | null;
  eventsList: null | string[];
  files: File[] | null;
  isFileInputMultiple: boolean;
  fileInputName: string | null;
}

export type EventsReducerActions =
  | SwitchEditMode
  | SwitchSaveButton
  | SavePoints
  | PointsOnChange
  | SaveEventsList
  | SaveFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SaveCopyOfPoints;

export const eventsInitState: EventsState = {
  editMode: false,
  saveButton: false,
  copyPoints: null,
  points: null,
  changedPoints: null,
  eventsList: null,
  files: null,
  isFileInputMultiple: false,
  fileInputName: null,
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SwitchEditMode: {
      return {
        ...state,
        editMode: action.payload.editMode,
      };
    }
    case EventsStrAction.SwitchSaveButton: {
      return {
        ...state,
        saveButton: action.payload.saveButton,
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
      if (!state.points) return state;
      return {
        ...state,
        files: action.payload.files,
        isFileInputMultiple: action.payload.isFileInputMultiple,
        fileInputName: action.payload.fileInputName,
        changedPoints: {
          ...state.changedPoints,
          imgs: {
            ...state.points.imgs,
            [action.payload.fileInputName]: [],
          },
        },
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
  fileInputName: keyof ImgsType;
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

export const switchSaveButton = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  saveButton: EventsState['saveButton'],
) => {
  eventsDispatch({
    type: EventsStrAction.SwitchSaveButton,
    payload: { saveButton },
  });
};
