import { Err } from 'api/fetchData';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SetOwnerId = 'SetOwnerId',
  SetErr = 'SetErr',
}

export interface AdminState {
  ownerId: string | null;
  isFetching: boolean;
  err: Err;
}

export type OwnerId = Pick<AdminState, 'ownerId'>;

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
  ownerId: null,
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
      return {
        ...state,
        ownerId: action.payload.ownerId,
      };
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
