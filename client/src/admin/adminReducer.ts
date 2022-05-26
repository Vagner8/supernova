import { Err } from 'api/fetcher';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SaveOwnerId = 'SaveOwnerId',
  SaveError = 'SaveError',
  DeleteError = 'DeleteError',
  SaveOwner = 'SaveOwner',
  SaveLoading = 'SaveLoading'
}

export interface Owner {
  personal: {
    name: string;
    surname: string;
    avatar: string;
  };
  contacts: {
    email: string;
    phone: string;
  };
  address: {
    city: string;
    zip: string;
    street: string;
    number: string;
  };
}

export interface Loading {
  type: 'ok' | 'error' | 'warning';
  message: string;
}

export interface AdminState {
  isFetching: boolean;
  error: Err | null;
  owner: Owner | null;
  loading: Loading | null;
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
  payload: Err | undefined;
}

interface DeleteError {
  type: AdminStrAction.DeleteError;
}

interface SaveOwner {
  type: AdminStrAction.SaveOwner;
  payload: Owner;
}

interface SaveLoading {
  type: AdminStrAction.SaveLoading;
  payload: Loading | null;
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | SaveError
  | DeleteError
  | SaveOwner
  | SaveLoading;

export const adminInitState: AdminState = {
  isFetching: false,
  error: null,
  owner: null,
  loading: null,
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
      if (!action.payload) {
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
      action.payload.logout && localStorage.removeItem('ownerId');
      return {
        ...state,
        error: action.payload
      };
    }
    case AdminStrAction.SaveOwner:
      return {
        ...state,
        owner: action.payload,
      };
    case AdminStrAction.SaveLoading: 
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
};
