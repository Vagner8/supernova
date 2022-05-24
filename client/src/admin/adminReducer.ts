import { Err } from 'api/fetcher';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SaveOwnerId = 'SaveOwnerId',
  SaveError = 'SaveError',
  DeleteError = 'DeleteError',
  SaveOwner = 'SaveOwner'
}

export interface Owner {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  address: string;
}

export interface AdminState {
  isFetching: boolean;
  error: Err | null;
  owner: Owner | null;
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
  payload: Owner
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | SaveError
  | DeleteError
  | SaveOwner;

export const adminInitState: AdminState = {
  isFetching: false,
  error: null,
  owner: null,
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
            text: 'unexpected error',
            logout: false,
            field: null,
          },
        };
      }
      action.payload.logout && localStorage.removeItem('ownerId');
      return {
        ...state,
        error: {
          ...state.error,
          status: action.payload.status,
          text: action.payload.text,
          logout: action.payload.logout,
          field: action.payload.field,
        },
      };
    }
    case AdminStrAction.SaveOwner: 
      return {
        ...state,
        owner: action.payload
      }
    default:
      return state;
  }
};
