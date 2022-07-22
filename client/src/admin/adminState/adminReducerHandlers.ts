import { OperationResultType } from '../../../../common/src/commonTypes';

interface loginInput {
  label: 'login' | 'password';
  type: 'text' | 'password';
  value: string;
  required: boolean;
}

export interface AdminState {
  isFetching: boolean;
  operationResults: OperationResultType[] | null;
  adminLogin: string | null;
  adminAvatar: string | null;
  loginInputs: loginInput[];
}

export enum AdminStrAction {
  SetAdminState = 'SetAdminState',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  AuthOnChange = 'AuthOnChange',
}

export interface AuthOnChange {
  type: AdminStrAction.AuthOnChange;
  payload: { name: string; value: string };
}
export const authOnChange = (
  state: AdminState,
  { name, value, }: AuthOnChange['payload']
) => {
  return {
    ...state,
    loginInputs: state.loginInputs.map((input) => {
      if (input.label === name) {
        return {
          ...input,
          value,
        };
      }
      return input;
    }),
  };
}

export interface SetAdminState {
  type: AdminStrAction.SetAdminState;
  payload: Partial<AdminState>;
}
export const setAdminState = (
  state: AdminState,
  changes: SetAdminState['payload'],
) => {
  return {
    ...state,
    ...changes,
  };
};

export interface DeleteOperationResult {
  type: AdminStrAction.DeleteOperationResult;
  payload: { index: number };
}
export const deleteOperationResult = (
  state: AdminState,
  { index }: DeleteOperationResult['payload'],
) => {
  if (!state.operationResults) return state;
  return {
    ...state,
    operationResults: state.operationResults.filter((_, i) => {
      return i !== index;
    }),
  };
};

export interface SaveOperationResult {
  type: AdminStrAction.SaveOperationResult;
  payload: {
    operationResult: OperationResultType;
  };
}
export const saveOperationResult = (
  state: AdminState,
  { operationResult }: SaveOperationResult['payload'],
) => {
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
};

export type AdminReducerActions =
  | SetAdminState
  | DeleteOperationResult
  | SaveOperationResult
  | AuthOnChange;
