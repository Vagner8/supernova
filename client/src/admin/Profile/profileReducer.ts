import { Reducer } from 'react';
import { OwnerPII } from './profileApi';

export type OwnerPIIKeys = keyof OwnerPII

export enum ProfileStrAction {
  SaveOwnerPII = 'SaveOwnerPII',
  SaveInputsOutputs = 'SaveInputsOutputs',
}

interface SaveOwnerPII {
  type: ProfileStrAction.SaveOwnerPII;
  payload: { ownerPII: OwnerPII };
}

interface SaveInputsOutputs {
  type: ProfileStrAction.SaveInputsOutputs;
  payload: { name: string, value: string, formName: OwnerPIIKeys };
}

export interface ProfileState {
 ownerPII: OwnerPII | null;
}

export const profileInitState: ProfileState = {
  ownerPII: null,
};

export type ProfileReducerActions = SaveOwnerPII | SaveInputsOutputs;

export const profileReducer: Reducer<ProfileState, ProfileReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case ProfileStrAction.SaveOwnerPII:
      return {
        ...state,
        ownerPII: action.payload.ownerPII
      }
    case ProfileStrAction.SaveInputsOutputs:
      if (!state.ownerPII) return state
      const {name, value, formName} = action.payload
      return {
        ...state,
        ownerPII: {
          ...state.ownerPII,
          [formName]: {
            ...state.ownerPII[formName],
            [name]: value
          }
        }
      }
    default:
      return state;
  }
};
