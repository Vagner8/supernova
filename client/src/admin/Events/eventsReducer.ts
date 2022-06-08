import { OwnerPII } from 'admin/Profile/profileApi';
import { Dispatch, Reducer } from 'react';

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
  CopyInputValues = 'CopyInputValues',
  SaveSelectedEvent = 'SaveSelectedEvent',
  ShowSaveEvent = 'ShowSaveEvent',
  SaveChangedPoints = 'SaveChangedPoints',
  DeleteChangedPoints = 'DeleteChangedPoints',
}

interface SaveFiles {
  type: EventsStrAction.SaveFiles;
  payload: { files: File[] };
}

interface DeleteOneFile {
  type: EventsStrAction.DeleteOneFile;
  payload: { fileName: string };
}

interface DeleteAllFiles {
  type: EventsStrAction.DeleteAllFiles;
}

interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { eventsList: EventsState['eventsList'] };
}

interface CopyInputValues {
  type: EventsStrAction.CopyInputValues;
  payload: { copyInputValues: OwnerPII | null };
}

interface SaveSelectedEvent {
  type: EventsStrAction.SaveSelectedEvent;
  payload: { selectedEvent: EventNames };
}

interface ShowSaveEvent {
  type: EventsStrAction.ShowSaveEvent;
  payload: { show: boolean };
}

interface SaveChangedPoints {
  type: EventsStrAction.SaveChangedPoints;
  payload: { pointName: keyof OwnerPII; points: OwnerPII };
}

interface DeleteChangedPoints {
  type: EventsStrAction.DeleteChangedPoints;
}

export interface EventsState {
  eventsList: string[];
  selectedEvent: EventNames | null;
  copyInputValues: OwnerPII | null;
  files: File[] | null;
  changedPoints: Partial<OwnerPII> | null;
}

export type EventsReducerActions =
  | SaveEventsList
  | CopyInputValues
  | SaveSelectedEvent
  | ShowSaveEvent
  | SaveFiles
  | DeleteOneFile
  | DeleteAllFiles
  | SaveChangedPoints
  | DeleteChangedPoints;

export const eventsInitState: EventsState = {
  selectedEvent: null,
  eventsList: [],
  copyInputValues: null,
  files: null,
  changedPoints: null,
};

interface SetEventsList {
  selectedEvent: EventsState['selectedEvent'];
  prevEventList: EventsState['eventsList'];
}

const setEventsList = ({
  selectedEvent,
  prevEventList,
}: SetEventsList): EventsState['eventsList'] => {
  if (!selectedEvent) return prevEventList;
  if (prevEventList.includes(selectedEvent)) {
    if (selectedEvent === EventNames.Edit) {
      return prevEventList.map((event) => {
        if (event === EventNames.Edit) {
          return EventNames.EditOff;
        }
        return event;
      });
    }
    if (selectedEvent === EventNames.EditOff) {
      return prevEventList.map((event) => {
        if (event === EventNames.EditOff) {
          return EventNames.Edit;
        }
        return event;
      });
    }
  }
  return prevEventList;
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SaveEventsList:
      return {
        ...state,
        eventsList: action.payload.eventsList,
      };
    case EventsStrAction.CopyInputValues:
      return {
        ...state,
        copyInputValues: action.payload.copyInputValues,
      };
    case EventsStrAction.SaveSelectedEvent:
      const { selectedEvent } = action.payload;
      return {
        ...state,
        selectedEvent: selectedEvent,
        eventsList: setEventsList({
          selectedEvent,
          prevEventList: state.eventsList,
        }),
      };
    case EventsStrAction.ShowSaveEvent:
      return {
        ...state,
        eventsList: action.payload.show
          ? [...state.eventsList, EventNames.Save]
          : state.eventsList.slice(0, state.eventsList.length - 1),
      };
    case EventsStrAction.SaveFiles:
      return {
        ...state,
        files: action.payload.files,
      };
    case EventsStrAction.DeleteOneFile:
      if (!state.files) return state;
      return {
        ...state,
        files: state.files.filter(
          (file) => file.name !== action.payload.fileName,
        ),
      };
    case EventsStrAction.DeleteAllFiles:
      return {
        ...state,
        files: null,
      };
    case EventsStrAction.SaveChangedPoints:
      const { pointName, points } = action.payload;
      return {
        ...state,
        changedPoints: {
          ...state.changedPoints,
          [pointName]: points[pointName],
        },
      };
    case EventsStrAction.DeleteChangedPoints:
      return {
        ...state,
        changedPoints: null,
      };
    default:
      return state;
  }
};

// onChange

export const saveChangedPoints = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  pointName: keyof OwnerPII,
  points: OwnerPII,
) => {
  eventsDispatch({
    type: EventsStrAction.SaveChangedPoints,
    payload: { points, pointName },
  });
};

export const deleteChangedPoints = (
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  eventsDispatch({
    type: EventsStrAction.DeleteChangedPoints,
  });
};

// events

export const saveEventsList = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  eventsList: string[],
) => {
  eventsDispatch({
    type: EventsStrAction.SaveEventsList,
    payload: { eventsList },
  });
};

export const saveSelectedEvent = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  selectedEvent: EventNames,
) => {
  eventsDispatch({
    type: EventsStrAction.SaveSelectedEvent,
    payload: { selectedEvent },
  });
};

export const showSaveEvent = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  show: boolean,
) => {
  eventsDispatch({
    type: EventsStrAction.ShowSaveEvent,
    payload: { show },
  });
};

// files

export const saveFiles = (
  eventsDispatch: Dispatch<EventsReducerActions>,
  files: File[],
) => {
  eventsDispatch({
    type: EventsStrAction.SaveFiles,
    payload: { files },
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
  eventsDispatch({ type: EventsStrAction.DeleteAllFiles });
};
