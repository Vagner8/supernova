import { Dispatch, Reducer } from 'react';
import { ImgUrlsType, PointsType } from '../../../../common/src/commonTypes';

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

export enum EventsStrAction {
  SaveFiles = 'SaveFiles',
  DeleteOneFile = 'DeleteOneFile',
  DeleteAllFiles = 'DeleteAllFiles',
  SaveEventsList = 'SaveEventsList',
  DeleteEventsList = 'DeleteEventsList',
  SavePoints = 'SavePoints',
  PointsOnChange = 'PointsOnChange',
  ResetEventState = 'ResetEventState',
  SwitchEditAndEditOf = 'SwitchEditAndEditOf',
  SwitchSaveEvent = 'SwitchSaveEvent',
  SaveCopyOfPoints = 'SaveCopyOfPoints',
}

interface ResetEventState {
  type: EventsStrAction.ResetEventState;
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

interface DeleteEventsList {
  type: EventsStrAction.DeleteEventsList;
}

interface SaveFiles {
  type: EventsStrAction.SaveFiles;
  payload: {
    files: File[];
    isFileInputMultiple: boolean;
    fileInputName: keyof ImgUrlsType;
  };
}

interface DeleteOneFile {
  type: EventsStrAction.DeleteOneFile;
  payload: { fileName: string };
}

interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

interface SwitchEditAndEditOf {
  type: EventsStrAction.SwitchEditAndEditOf;
  payload: { switchTo: EventNames.Edit | EventNames.EditOff };
}

interface SwitchSaveEvent {
  type: EventsStrAction.SwitchSaveEvent;
  payload: { saveEvent: 'show' | 'hide' };
}

interface SaveCopyOfPoints {
  type: EventsStrAction.SaveCopyOfPoints;
}

export interface EventsState {
  copyPoints: PointsType | null;
  points: PointsType | null;
  changedPoints: Partial<PointsType> | null;
  eventsList: null | string[];
  files: File[] | null;
  isFileInputMultiple: boolean;
  fileInputName: string | null;
}

export type EventsReducerActions =
  | ResetEventState
  | SavePoints
  | PointsOnChange
  | SaveEventsList
  | DeleteEventsList
  | SaveFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SwitchEditAndEditOf
  | SwitchSaveEvent
  | SaveCopyOfPoints;

export const eventsInitState: EventsState = {
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
    case EventsStrAction.ResetEventState: {
      return {
        ...state,
        points: state.copyPoints,
        files: null,
        changedPoints: null,
        eventsList:
          state.eventsList &&
          state.eventsList.filter((item) => item !== EventNames.Save),
      };
    }
    case EventsStrAction.SaveEventsList: {
      return {
        ...state,
        eventsList: action.payload.newEventsList,
      };
    }
    case EventsStrAction.DeleteEventsList: {
      if (!state.eventsList) return state;
      return {
        ...state,
        eventsList: null,
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
          imgUrls: {
            ...state.points.imgUrls,
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
    case EventsStrAction.SwitchEditAndEditOf: {
      return {
        ...state,
        eventsList:
          state.eventsList &&
          state.eventsList.map((event) => {
            if (event.match(/edit/i)) {
              return action.payload.switchTo;
            }
            return event;
          }),
      };
    }
    case EventsStrAction.SwitchSaveEvent: {
      if (!state.eventsList) return state;
      if (
        action.payload.saveEvent === 'show' &&
        !state.eventsList.includes(EventNames.Save)
      ) {
        return {
          ...state,
          eventsList: [...state.eventsList, EventNames.Save],
        };
      }
      if (action.payload.saveEvent === 'hide') {
        return {
          ...state,
          eventsList: state.eventsList.filter(
            (item) => item !== EventNames.Save,
          ),
        };
      }
      return state;
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

export const deleteEventsList = (
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  eventsDispatch({
    type: EventsStrAction.DeleteEventsList,
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
  fileInputName: keyof ImgUrlsType;
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

export const resetEventState = (
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  eventsDispatch({
    type: EventsStrAction.ResetEventState,
  });
};

export const switchEditAndEditOf = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  switchTo: EventNames.Edit | EventNames.EditOff,
) => {
  eventsDispatch({
    type: EventsStrAction.SwitchEditAndEditOf,
    payload: { switchTo },
  });
};

export const switchSaveEvent = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  saveEvent: 'show' | 'hide',
) => {
  eventsDispatch({
    type: EventsStrAction.SwitchSaveEvent,
    payload: { saveEvent },
  });
};
