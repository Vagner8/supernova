import { Dispatch, Reducer } from 'react';
import { OwnerCommonData } from './adminApi';

export enum AdminStrAction {
  SaveOwnerId = 'SaveOwnerId',
  SaveOwnerCommonData = 'SaveOwnerCommonData',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  SetIsFetching = 'SetIsFetching',
}

export interface OperationResult {
  status: 'ok' | 'error' | 'warning';
  message: string;
  field: string | null;
  logout: boolean;
}

interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: { isFetching: boolean };
}

interface SaveOwnerCommonData {
  type: AdminStrAction.SaveOwnerCommonData;
  payload: { ownerCommonData: OwnerCommonData };
}

interface DeleteOperationResult {
  type: AdminStrAction.DeleteOperationResult;
}

interface SaveOperationResult {
  type: AdminStrAction.SaveOperationResult;
  payload: {
    operationResult: OperationResult;
  };
}

interface SaveOwnerId {
  type: AdminStrAction.SaveOwnerId;
  payload: { ownerId: string };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | SaveOwnerCommonData
  | DeleteOperationResult
  | SaveOperationResult;

export interface AdminState {
  isFetching: boolean;
  operationResult: Omit<OperationResult, 'logout'> | null;
  avatar: string | null;
  login: string | null;
}

export const adminInitState: AdminState = {
  isFetching: false,
  operationResult: null,
  avatar: null,
  login: null,
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SaveOwnerId:
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
    case AdminStrAction.SaveOperationResult:
      const { operationResult } = action.payload;
      operationResult.logout && localStorage.removeItem('ownerId');
      return {
        ...state,
        operationResult,
      };
    case AdminStrAction.DeleteOperationResult:
      return {
        ...state,
        operationResult: null,
      };
    default:
      return state;
  }
};

export const setIsFetching = (
  adminDispatch: Dispatch<AdminReducerActions>,
  isFetching: boolean,
) => {
  adminDispatch({
    type: AdminStrAction.SetIsFetching,
    payload: { isFetching },
  });
};

export const saveOperationResult = (
  adminDispatch: Dispatch<AdminReducerActions>,
  operationResult: OperationResult,
) => {
  adminDispatch({
    type: AdminStrAction.SaveOperationResult,
    payload: { operationResult },
  });
};

export const deleteOperationResult = (
  adminDispatch: Dispatch<AdminReducerActions>,
) => {
  adminDispatch({ type: AdminStrAction.DeleteOperationResult })
}

export const saveOwnerId = (
  adminDispatch: Dispatch<AdminReducerActions>,
  ownerId: string
) => {
  adminDispatch({
    type: AdminStrAction.SaveOwnerId,
    payload: { ownerId },
  });
}