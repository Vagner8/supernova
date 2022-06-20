import { Reducer } from 'react';

export enum SetStrAction {
  SwitchEditMode = 'SwitchEditMode',
}

interface SwitchEditMode {
  type: SetStrAction.SwitchEditMode;
  Payload: { editMode: SetState['editMode'] }
}

type SetReducerActions = SwitchEditMode

export interface SetState {
  editMode: boolean
}

export const setInitState: SetState = {
  editMode: false
};

export const setReducer: Reducer<SetState, SetReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case SetStrAction.SwitchEditMode: {
      return {
        ...state,
        editMode: action.Payload.editMode
      }
    }
    default: {
      return state
    }
  }
};
