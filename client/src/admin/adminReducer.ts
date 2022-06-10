import { Dispatch, Reducer } from 'react';
import { OwnerCommonData } from './adminApi';

export enum AdminStrAction {
  SaveOwnerId = 'SaveOwnerId',
  SaveOwnerCommonData = 'SaveOwnerCommonData',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  SetIsFetching = 'SetIsFetching',
  SaveNewAvatar = 'SaveNewAvatar',
}

export interface OperationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  field: string | null;
  logout: boolean;
}

interface SaveNewAvatar {
  type: AdminStrAction.SaveNewAvatar;
  payload: { newAvatar: AdminState['avatar'] };
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
  payload: { index: number };
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
  | SaveOperationResult
  | SaveNewAvatar;

export interface AdminState {
  isFetching: boolean;
  operationResults: OperationResult[];
  avatar: string | null;
  login: string | null;
}

export const adminInitState: AdminState = {
  isFetching: false,
  operationResults: [],
  avatar: null,
  login: null,
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SaveNewAvatar: {
      return {
        ...state,
        avatar: action.payload.newAvatar,
      };
    }
    case AdminStrAction.SaveOwnerId: {
      localStorage.setItem('ownerId', action.payload.ownerId);
      return {
        ...state,
        ownerId: action.payload.ownerId,
      };
    }
    case AdminStrAction.SetIsFetching: {
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    }
    case AdminStrAction.SaveOwnerCommonData: {
      return {
        ...state,
        avatar: action.payload.ownerCommonData.personal.avatar,
        login: action.payload.ownerCommonData.login,
      };
    }
    case AdminStrAction.SaveOperationResult: {
      const { operationResult } = action.payload;
      operationResult.logout && localStorage.removeItem('ownerId');
      if (state.operationResults.length === 0) {
        return {
          ...state,
          operationResults: [...state.operationResults, operationResult],
        };
      }
      return {
        ...state,
        operationResults: state.operationResults.some(
          (result) => result.message === operationResult.message,
        )
          ? state.operationResults
          : [...state.operationResults, operationResult],
      };
    }
    case AdminStrAction.DeleteOperationResult: {
      if (!state.operationResults[action.payload.index]) return state
      return {
        ...state,
        operationResults: state.operationResults.filter((_, index) => {
          return index !== action.payload.index;
        }),
      };
    }
    default:
      return state;
  }
};

export const saveNewAvatar = (
  adminDispatch: Dispatch<AdminReducerActions>,
  newAvatar: AdminState['avatar'],
) => {
  adminDispatch({
    type: AdminStrAction.SaveNewAvatar,
    payload: { newAvatar },
  });
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

export const saveOwnerCommonData = (
  adminDispatch: Dispatch<AdminReducerActions>,
  ownerCommonData: OwnerCommonData,
) => {
  adminDispatch({
    type: AdminStrAction.SaveOwnerCommonData,
    payload: { ownerCommonData },
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
  index: number,
) => {
  adminDispatch({
    type: AdminStrAction.DeleteOperationResult,
    payload: { index },
  });
};

export const saveOwnerId = (
  adminDispatch: Dispatch<AdminReducerActions>,
  ownerId: string,
) => {
  adminDispatch({
    type: AdminStrAction.SaveOwnerId,
    payload: { ownerId },
  });
};
