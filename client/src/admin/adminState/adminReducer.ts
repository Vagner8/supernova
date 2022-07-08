import { Reducer } from 'react';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { AdminReducerActions, AdminStrAction } from './adminReducerHandlers';


export interface AdminState {
  isFetching: boolean;
  operationResults: OperationResultType[] | null;
  adminLogin: string | null;
  adminAvatar: string | null;
}

export const adminInitState: AdminState = {
  isFetching: false,
  operationResults: null,
  adminLogin: null,
  adminAvatar: null,
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SaveAdminId: {
      localStorage.setItem('adminId', action.payload.adminId);
      return { ...state, adminId: action.payload.adminId };
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
      if (!state.operationResults) return state;
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
        operationResults: null,
      };
    }
    case AdminStrAction.SaveAvatarAndLogin: {
      return {
        ...state,
        adminAvatar: action.payload.avatarAndLogin.avatar[0],
        adminLogin: action.payload.avatarAndLogin.login,
      };
    }
    default:
      return state;
  }
};
