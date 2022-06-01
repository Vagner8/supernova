import { Err } from 'api/fetcher';
import { Reducer } from 'react';
import { OwnerCommonData } from './adminApi';

export enum AdminStrAction {
  SaveOwnerid = 'SaveOwnerid',
  SaveOwnerCommonData = 'SaveOwnerCommonData',
  SaveFetchResult = 'SaveFetchResult',
  DeleteFetchResult = 'DeleteFetchResult',
  SetIsFetching = 'SetIsFetching',
}

export interface FetchResult {
  status: 'ok' | 'error' | 'warning' | null;
  message: string | null;
  field: string | null;
  logout: boolean
}

export interface AdminState {
  isFetching: boolean;
  fetchResult: FetchResult | null;
  avatar: string | null;
  login: string | null;
}

interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: { isFetching: boolean };
}

interface SaveOwnerCommonData {
  type: AdminStrAction.SaveOwnerCommonData;
  payload: { ownerCommonData: OwnerCommonData };
}

interface DeleteFetchResult {
  type: AdminStrAction.DeleteFetchResult;
}

interface SaveFetchResult {
  type: AdminStrAction.SaveFetchResult;
  payload: {
    fetchResult:
      | Err
      | { status: FetchResult['status']; message: string }
      | null;
  };
}

interface SaveOwnerid {
  type: AdminStrAction.SaveOwnerid;
  payload: { ownerId: string };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerid
  | SaveOwnerCommonData
  | DeleteFetchResult
  | SaveFetchResult;

export const adminInitState: AdminState = {
  isFetching: false,
  fetchResult: null,
  avatar: null,
  login: null,
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SaveOwnerid:
      localStorage.setItem('ownerId', action.payload.ownerId);
      return {
        ...state,
        ownerId: action.payload.ownerId,
      };
    case AdminStrAction.SetIsFetching:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    case AdminStrAction.SaveOwnerCommonData:
      return {
        ...state,
        avatar: action.payload.ownerCommonData.personal.avatar,
        login: action.payload.ownerCommonData.login,
      };
    case AdminStrAction.SaveFetchResult:
      const { fetchResult } = action.payload
      if (!fetchResult) {
        return {
          ...state,
          fetchResult: {
            ...state.fetchResult,
            status: 'error',
            message: 'unexpected error',
            field: null,
            logout: false
          },
        };
      }
      if ('logout' in fetchResult) {
        fetchResult.logout && localStorage.removeItem('ownerId');
        return {
          ...state,
          fetchResult: {
            ...state.fetchResult,
            status: 'error',
            message: fetchResult.message,
            field: fetchResult.field,
            logout: fetchResult.logout
          },
        };
      }
      return {
        ...state,
        fetchResult: {
          ...state.fetchResult,
          status: fetchResult.status,
          message: fetchResult.message,
          field: null,
          logout: false
        }
      }
    case AdminStrAction.DeleteFetchResult:
      return {
        ...state,
        fetchResult: null
      }
    default:
      return state;
  }
};
