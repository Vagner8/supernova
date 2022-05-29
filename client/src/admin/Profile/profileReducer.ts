import { Reducer, ReducerAction } from 'react';

export interface Personal {
  name: string;
  surname: string;
  avatar: string;
}

export interface Contacts {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  zip: string;
  street: string;
  number: string;
}

export interface ProfileType {
  personal: Personal;
  contacts: Contacts;
  address: Address;
}

export enum ProfileStrAction {
  SaveProfile = 'SaveProfile',
}

interface SaveProfile {
  type: ProfileStrAction.SaveProfile;
  payload: { profile: ProfileType };
}

interface ProfileState {
  profile: ProfileType | null;
}

export const profileInitState: ProfileState = {
  profile: null,
};

export type ProfileReducerActions = SaveProfile;

export const profileReducer: Reducer<ProfileState, ProfileReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case ProfileStrAction.SaveProfile:
      return {
        profile: action.payload.profile
      }
    default:
      return state;
  }
};
