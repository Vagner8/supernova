import { Err } from 'api/fetcher';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SaveOwnerId = 'SaveOwnerId',
  SaveError = 'SaveError',
  DeleteError = 'DeleteError',
  SaveOwner = 'SaveOwner',
  SaveEventResult = 'SaveEventResult',
  SaveOwnerChanges = 'SaveOwnerChanges',
}

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

export interface Owner {
  personal: Personal;
  contacts: Contacts;
  address: Address;
}

export type OwnerKeys = keyof Owner;
type PersonalKeys = keyof Owner['personal'];
type ContactsKeys = keyof Owner['contacts'];
type AddressKeys = keyof Owner['address'];
export type OwnerNestedKeys = PersonalKeys | ContactsKeys | AddressKeys;

export interface EventResult {
  status: 'ok' | 'error' | 'warning';
  message: string;
}

export interface AdminState {
  isFetching: boolean;
  error: Err | null;
  owner: Owner | null;
  ownerCopy: Owner | null;
  eventResult: EventResult | null;
}

export interface OwnerId {
  ownerId: string;
}

interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: Pick<AdminState, 'isFetching'>;
}

interface SaveOwnerId {
  type: AdminStrAction.SaveOwnerId;
  payload: OwnerId;
}

interface SaveError {
  type: AdminStrAction.SaveError;
  payload: { error: Err | undefined };
}

interface DeleteError {
  type: AdminStrAction.DeleteError;
}

interface SaveOwner {
  type: AdminStrAction.SaveOwner;
  payload: Owner;
}

interface SaveEventResult {
  type: AdminStrAction.SaveEventResult;
  payload: { eventResult: EventResult | null };
}

interface SaveOwnerChanges {
  type: AdminStrAction.SaveOwnerChanges;
  payload: {
    name: OwnerNestedKeys;
    value: string;
    key: OwnerKeys;
  };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | SaveError
  | DeleteError
  | SaveOwner
  | SaveEventResult
  | SaveOwnerChanges;

export const adminInitState: AdminState = {
  isFetching: false,
  error: null,
  owner: null,
  ownerCopy: null,
  eventResult: null,
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SetIsFetching:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    case AdminStrAction.SaveOwnerId:
      localStorage.setItem('ownerId', action.payload.ownerId);
      return state;
    case AdminStrAction.SaveError: {
      if (!action.payload.error) {
        return {
          ...state,
          error: {
            ...state.error,
            status: 400,
            message: 'unexpected error',
            logout: false,
            field: null,
          },
        };
      }
      action.payload.error.logout && localStorage.removeItem('ownerId');
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case AdminStrAction.SaveOwner:
      return {
        ...state,
        owner: action.payload,
      };
    case AdminStrAction.SaveEventResult:
      return {
        ...state,
        eventResult: action.payload.eventResult,
      };
    case AdminStrAction.SaveOwnerChanges:
      const { key, name, value } = action.payload;
      if (!state.owner) return state;
      if (!state.ownerCopy) state.ownerCopy = state.owner;
      return {
        ...state,
        owner: {
          ...state.owner,
          [key]: {
            ...state.owner[key],
            [name]: value,
          },
        },
      };
    default:
      return state;
  }
};
