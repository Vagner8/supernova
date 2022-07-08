import { UseFetchAvatarAndLoginResponse } from "api/users/useFetchAvatarAndLogin";
import { OperationResultType } from "../../../../common/src/operationResultType";

export enum AdminStrAction {
  SaveAdminId = 'SaveAdminId',
  SaveOperationResult = 'SaveOperationResult',
  DeleteOperationResult = 'DeleteOperationResult',
  SetIsFetching = 'SetIsFetching',
  SaveAvatarAndLogin = 'SaveAvatarAndLogin',
  DeleteAllOperationResults = 'DeleteAllOperationResults',
}

export interface SetIsFetching {
  type: AdminStrAction.SetIsFetching;
  payload: { isFetching: boolean };
}

export interface DeleteOperationResult {
  type: AdminStrAction.DeleteOperationResult;
  payload: { index: number };
}

export interface DeleteAllOperationResults {
  type: AdminStrAction.DeleteAllOperationResults;
}

export interface SaveOperationResult {
  type: AdminStrAction.SaveOperationResult;
  payload: {
    operationResult: OperationResultType;
  };
}

export interface SaveAdminId {
  type: AdminStrAction.SaveAdminId;
  payload: { adminId: string };
}

export interface SaveAvatarAndLogin {
  type: AdminStrAction.SaveAvatarAndLogin;
  payload: { avatarAndLogin: UseFetchAvatarAndLoginResponse };
}

export type AdminReducerActions =
  | SetIsFetching
  | SaveAdminId
  | DeleteOperationResult
  | DeleteAllOperationResults
  | SaveOperationResult
  | SaveAvatarAndLogin;
