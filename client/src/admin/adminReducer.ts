import { Err } from 'api/fetcher';
import { Reducer } from 'react';

export enum AdminStrAction {
  SetIsFetching = 'SetIsFetching',
  SaveOwnerId = 'SaveOwnerId',
  SaveError = 'SaveError',
  DeleteError = 'DeleteError',
  SaveEventResult = 'SaveEventResult',
}

export interface EventResult {
  status: 'ok' | 'error' | 'warning';
  message: string;
}

export interface AdminState {
  isFetching: boolean;
  error: Err | null;
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

interface SaveEventResult {
  type: AdminStrAction.SaveEventResult;
  payload: { eventResult: EventResult | null };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | SaveError
  | DeleteError
  | SaveEventResult

export const adminInitState: AdminState = {
  isFetching: false,
  error: null,
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
    case AdminStrAction.SaveError:
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
    case AdminStrAction.SaveEventResult:
      return {
        ...state,
        eventResult: action.payload.eventResult,
      };
    default:
      return state;
  }
};
