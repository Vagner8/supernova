import { Reducer } from 'react';
import { OwnerPII } from './profileApi';

export type OwnerPIIKeys = keyof OwnerPII

export enum ProfileStrAction {
  SaveOwnerPersonalData = 'SaveOwnerPersonalData',
  SaveInputsOutputs = 'SaveInputsOutputs',
}

interface SaveOwnerPersonalData {
  type: ProfileStrAction.SaveOwnerPersonalData;
  payload: { ownerPII: OwnerPII };
}

interface SaveInputsOutputs {
  type: ProfileStrAction.SaveInputsOutputs;
  payload: { name: string, value: string, formName: OwnerPIIKeys };
}

interface ProfileState {
  ownerPII: OwnerPII | null;
  copyOwnerPII: OwnerPII | null;
}

export const profileInitState: ProfileState = {
  ownerPII: null,
  copyOwnerPII: null,
};

export type ProfileReducerActions = SaveOwnerPersonalData | SaveInputsOutputs;

export const profileReducer: Reducer<ProfileState, ProfileReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case ProfileStrAction.SaveOwnerPersonalData:
      return {
        ...state,
        ownerPII: action.payload.ownerPII,
        copyOwnerPII: action.payload.ownerPII
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
