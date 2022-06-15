import { Dispatch, Reducer } from 'react';
import { FetchAndSaveAvatarAndLoginResponse } from './adminApi';

export enum AdminStrAction {
  SaveOwnerId = 'SaveOwnerId',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  SetIsFetching = 'SetIsFetching',
  SaveAvatarAndLogin = 'SaveAvatarAndLogin',
  SwitchDrawer = 'SwitchDrawer',
  DeleteAllOperationResults = 'DeleteAllOperationResults'
}

export interface OperationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  field: string | null;
  logout: boolean;
}

interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: { isFetching: boolean };
}

interface DeleteOperationResult {
  type: AdminStrAction.DeleteOperationResult;
  payload: { index: number };
}

interface DeleteAllOperationResults {
  type: AdminStrAction.DeleteAllOperationResults
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

interface SaveAvatarAndLogin {
  type: AdminStrAction.SaveAvatarAndLogin;
  payload: { avatarAndLogin: FetchAndSaveAvatarAndLoginResponse };
}

interface SwitchDrawer {
  type: AdminStrAction.SwitchDrawer;
  payload: { drawer: AdminState['drawer'] };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveOwnerId
  | DeleteOperationResult
  | DeleteAllOperationResults
  | SaveOperationResult
  | SaveAvatarAndLogin
  | SwitchDrawer;

export interface AdminState {
  isFetching: boolean;
  operationResults: OperationResult[] | null;
  ownerLogin: string | null;
  ownerAvatar: string | null;
  drawer: 'show' | 'hide';
}

export const adminInitState: AdminState = {
  isFetching: false,
  operationResults: null,
  ownerLogin: null,
  ownerAvatar: null,
  drawer: 'hide',
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
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
    case AdminStrAction.SaveOperationResult: {
      if (!state.operationResults) return state
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
      if (!state.operationResults) return state
      if (!state.operationResults[action.payload.index]) return state;
      return {
        ...state,
        operationResults: state.operationResults.filter((_, index) => {
          return index !== action.payload.index;
        }),
      };
    }
    case AdminStrAction.DeleteAllOperationResults: {
      return {
        ...state,
        operationResults: []
      }
    }
    case AdminStrAction.SaveAvatarAndLogin: {
      return {
        ...state,
        ownerAvatar: action.payload.avatarAndLogin.imgUrls.avatar[0],
        ownerLogin: action.payload.avatarAndLogin.login,
      };
    }
    case AdminStrAction.SwitchDrawer: {
      return {
        ...state,
        drawer: action.payload.drawer,
      };
    }
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
  index: number,
) => {
  adminDispatch({
    type: AdminStrAction.DeleteOperationResult,
    payload: { index },
  });
};

export const deleteAllOperationResults = (
  adminDispatch: Dispatch<AdminReducerActions>,
) => {
  adminDispatch({
    type: AdminStrAction.DeleteAllOperationResults,
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

export const saveOwnerNameAndAvatar = (
  adminDispatch: Dispatch<AdminReducerActions>,
  avatarAndLogin: FetchAndSaveAvatarAndLoginResponse,
) => {
  adminDispatch({
    type: AdminStrAction.SaveAvatarAndLogin,
    payload: { avatarAndLogin },
  });
};

export const switchDrawer = (
  adminDispatch: Dispatch<AdminReducerActions>,
  drawer: AdminState['drawer'],
) => {
  adminDispatch({
    type: AdminStrAction.SwitchDrawer,
    payload: { drawer },
  });
};