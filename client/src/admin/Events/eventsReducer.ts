import { OwnerPII } from 'admin/Profile/profileApi';
import { Reducer } from 'react';

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save',
}

export enum EventsStrAction {
  SaveEventsList = 'SaveEventsList',
  CopyInputValues = 'CopyInputValues',
  SaveSelectedEvent = 'SaveSelectedEvent',
}

interface SaveEventsList {
  type: EventsStrAction.SaveEventsList;
  payload: { eventsList: EventsState['eventsList'] };
}

interface CopyInputValues {
  type: EventsStrAction.CopyInputValues;
  payload: { copyInputValues: CopiesInputValues | null };
}

interface SaveSelectedEvent {
  type: EventsStrAction.SaveSelectedEvent;
  payload: { selectedEvent: EventNames };
}

export interface EventsState {
  eventsList: string[];
  selectedEvent: EventNames | null;
  copyInputValues: CopiesInputValues | null;
}

export type CopiesInputValues = OwnerPII;

export type EventsReducerActions =
  | SaveEventsList
  | CopyInputValues
  | SaveSelectedEvent;

export const eventsInitState: EventsState = {
  selectedEvent: null,
  eventsList: [],
  copyInputValues: null,
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
        if (event === EventNames.Save) {
          return ''
        }
        return event;
      });
    }
  }
  if (selectedEvent === EventNames.Save) {
    return [...prevEventList, EventNames.Save];
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
    default:
      return state;
  }
};
