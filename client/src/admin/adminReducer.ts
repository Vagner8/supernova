import { UseFetchAvatarAndLoginResponse } from 'api/users/useFetchAvatarAndLogin';
import { Dispatch, Reducer } from 'react';
import { OperationResultType } from '../../../common/src/operationResultType';

export enum AdminStrAction {
  SaveAdminId = 'SaveAdminId',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  SetIsFetching = 'SetIsFetching',
  SaveAvatarAndLogin = 'SaveAvatarAndLogin',
  SwitchDrawer = 'SwitchDrawer',
  DeleteAllOperationResults = 'DeleteAllOperationResults'
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
    operationResult: OperationResultType;
  };
}

interface SaveAdminId {
  type: AdminStrAction.SaveAdminId;
  payload: { adminId: string };
}

interface SaveAvatarAndLogin {
  type: AdminStrAction.SaveAvatarAndLogin;
  payload: { avatarAndLogin: UseFetchAvatarAndLoginResponse };
}

interface SwitchDrawer {
  type: AdminStrAction.SwitchDrawer;
  payload: { drawer: AdminState['drawer'] };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveAdminId
  | DeleteOperationResult
  | DeleteAllOperationResults
  | SaveOperationResult
  | SaveAvatarAndLogin
  | SwitchDrawer;

export interface AdminState {
  isFetching: boolean;
  operationResults: OperationResultType[] | null;
  adminLogin: string | null;
  adminAvatar: string | null;
  drawer: 'show' | 'hide';
}

export const adminInitState: AdminState = {
  isFetching: false,
  operationResults: null,
  adminLogin: null,
  adminAvatar: null,
  drawer: 'hide',
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SaveAdminId: {
      localStorage.setItem('adminId', action.payload.adminId);
      return {...state, adminId: action.payload.adminId}
    }
    case AdminStrAction.SetIsFetching: {
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    }
    case AdminStrAction.SaveOperationResult: {
      const { operationResult } = action.payload;
      operationResult.logout && localStorage.removeItem('adminId');
      if (!state.operationResults) {
        return {
          ...state,
          operationResults: [operationResult],
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
        operationResults: null
      }
    }
    case AdminStrAction.SaveAvatarAndLogin: {
      return {
        ...state,
        adminAvatar: action.payload.avatarAndLogin.imgs.avatar[0],
        adminLogin: action.payload.avatarAndLogin.configs.login,
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
  operationResult: OperationResultType,
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


export const saveAdminId = (
  adminDispatch: Dispatch<AdminReducerActions>,
  adminId: string,
) => {
  adminDispatch({
    type: AdminStrAction.SaveAdminId,
    payload: { adminId },
  });
};

export const saveOwnerNameAndAvatar = (
  adminDispatch: Dispatch<AdminReducerActions>,
  avatarAndLogin: UseFetchAvatarAndLoginResponse,
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