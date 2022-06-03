import { OwnerPII } from 'admin/Profile/profileApi';
import { Reducer } from 'react';

export enum EventNames {
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
  Save = 'save'
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
        eventsList: state.eventsList.map((event, _, list) => {
          if (
            selectedEvent === EventNames.Edit ||
            selectedEvent === EventNames.EditOff
          ) {
            return event === EventNames.EditOff
              ? EventNames.Edit
              : EventNames.EditOff;
          }
          // if (selectedEvent === EventNames.Save) {

          // }
          return event;
        }),
      };
    default:
      return state;
  }
};
