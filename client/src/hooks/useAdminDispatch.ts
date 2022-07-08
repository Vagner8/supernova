import {
  AdminReducerActions,
  AdminStrAction,
  DeleteOperationResult,
  SaveAdminId,
  SaveAvatarAndLogin,
  SaveOperationResult,
  SetIsFetching,
} from 'admin/adminState';
import { Dispatch, useMemo } from 'react';

export function useAdminDispatch(adminDispatch: Dispatch<AdminReducerActions>) {
  return useMemo(() => {
    return {
      setIsFetching({ isFetching }: SetIsFetching['payload']) {
        adminDispatch({
          type: AdminStrAction.SetIsFetching,
          payload: { isFetching },
        });
      },

      saveOperationResult({ operationResult }: SaveOperationResult['payload']) {
        adminDispatch({
          type: AdminStrAction.SaveOperationResult,
          payload: { operationResult },
        });
      },

      deleteOperationResult({ index }: DeleteOperationResult['payload']) {
        adminDispatch({
          type: AdminStrAction.DeleteOperationResult,
          payload: { index },
        });
      },

      deleteAllOperationResults() {
        adminDispatch({
          type: AdminStrAction.DeleteAllOperationResults,
        });
      },

      saveAdminId({ adminId }: SaveAdminId['payload']) {
        adminDispatch({
          type: AdminStrAction.SaveAdminId,
          payload: { adminId },
        });
      },

      saveOwnerNameAndAvatar({
        avatarAndLogin,
      }: SaveAvatarAndLogin['payload']) {
        adminDispatch({
          type: AdminStrAction.SaveAvatarAndLogin,
          payload: { avatarAndLogin },
        });
      },
    };
  }, [adminDispatch]);
}
