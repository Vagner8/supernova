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
  SetEditMode = 'SetEditMode',
  SetDependentState = 'SetDependentState',
  SwitchSaveButton = 'SwitchSaveButton',
}

interface SaveEvents {
  type: EventsStrAction.SaveEvents;
  payload: { events: EventsType };
}

interface SetEditMode {
  type: EventsStrAction.SetEditMode;
}

interface SetDependentState {
  type: EventsStrAction.SetDependentState;
  payload: { stateName: DependentState };
}

interface SwitchSaveButton {
  type: EventsStrAction.SwitchSaveButton;
  payload: { saveButton: boolean };
}

export type EventsType = string[];

export type DependentState = 'adminState';

export interface EventsState {
  events: EventsType;
  editMode: boolean;
  dependentState: DependentState | null;
  saveButton: boolean;
}

export type EventsReducerActions =
  | SaveEvents
  | SetEditMode
  | SetDependentState
  | SwitchSaveButton;

export const eventsInitState: EventsState = {
  events: [EventNames.NoEvents],
  editMode: false,
  dependentState: null,
  saveButton: false,
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
        events: state.events.map((event) => {
          if (event === EventNames.EditOff) {
            return EventNames.Edit;
          }
          if (event === EventNames.Edit) {
            return EventNames.EditOff;
          }
          return event;
        }),
      };
    case EventsStrAction.SetDependentState:
      return {
        ...state,
        dependentState: action.payload.stateName,
      };
    case EventsStrAction.SwitchSaveButton:
      return {
        ...state,
        saveButton: action.payload.saveButton,
      };
    default:
      return state;
  }
};
