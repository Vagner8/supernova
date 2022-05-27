import { Reducer } from 'react';

export enum EventNames {
  NoEvents = 'no events',
  New = 'new',
  Edit = 'edit',
  EditOff = 'edit off',
  Copy = 'copy',
  Delete = 'delete',
}

export enum EventsStrAction {
  SaveEvents = 'SaveEvents',
  SetEditMode= 'SetEditMode',
}

interface SaveEvents {
  type: EventsStrAction.SaveEvents;
  payload: { events: EventsType };
}

interface SetEditMode {
  type: EventsStrAction.SetEditMode;
}

export type EventsType = string[];

export interface EventsState {
  events: EventsType;
  editMode: boolean;
}

export type EventsReducerActions = SaveEvents | SetEditMode;

export const eventsInitState: EventsState = {
  events: [EventNames.NoEvents],
  editMode: false,
};

export const eventsReducer: Reducer<EventsState, EventsReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case EventsStrAction.SaveEvents:
      return {
        ...state,
        events: action.payload.events,
      };
      case EventsStrAction.SetEditMode:
        return {
          ...state,
          editMode: !state.editMode,
          events: state.events.map(event => {
            if (event === EventNames.EditOff) {
              return EventNames.Edit
            }
            if (event === EventNames.Edit) {
              return EventNames.EditOff
            }
            return event
          })
        };
    default:
      return state;
  }
};
