import { Err } from 'api/fetcher';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SetOwnerId = 'SetOwnerId',
  SetErr = 'SetErr',
}

export interface AdminState {
  isFetching: boolean;
  err: Err;
}

export interface OwnerId  {
  ownerId: string;
}

interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: Pick<AdminState, 'isFetching'>;
}

interface SetOwnerId {
  type: AdminStrAction.SetOwnerId;
  payload: OwnerId;
}

interface SetErr {
  type: AdminStrAction.SetErr;
  payload: Err | undefined;
}

export type AdminReducerActions = SetIsFetching | SetOwnerId | SetErr;

export const adminInitState: AdminState = {
  isFetching: false,
  err: {
    errorMessage: null,
    logout: false,
  },
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
    case AdminStrAction.SetOwnerId:
      localStorage.setItem('ownerId', action.payload.ownerId)
      return state
    case AdminStrAction.SetErr: {
      if (!action.payload) {
        return {
          ...state,
          error: {
            ...state.err,
            errorMessage: 'unexpected error',
            logout: false,
          },
        };
      }
      if ('logout' in action.payload) {
        action.payload.logout && localStorage.removeItem('ownerId')
        return {
          ...state,
          error: {
            ...state.err,
            errorMessage: action.payload.errorMessage,
            logout: action.payload.logout,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};
