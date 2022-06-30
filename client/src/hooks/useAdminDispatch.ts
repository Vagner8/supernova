import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { UseFetchAvatarAndLoginResponse } from 'api/users/useFetchAvatarAndLogin';
import { Dispatch, useMemo } from 'react';
import { OperationResultType } from '../../../common/src/operationResultType';

export function useAdminDispatch(adminDispatch: Dispatch<AdminReducerActions>) {
  return useMemo(() => {
    return {
      setIsFetching(isFetching: boolean) {
        adminDispatch({
          type: AdminStrAction.SetIsFetching,
          payload: { isFetching },
        });
      },

      saveOperationResult(operationResult: OperationResultType) {
        adminDispatch({
          type: AdminStrAction.SaveOperationResult,
          payload: { operationResult },
        });
      },

      deleteOperationResult(index: number) {
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

      saveAdminId(adminId: string) {
        adminDispatch({
          type: AdminStrAction.SaveAdminId,
          payload: { adminId },
        });
      },

      saveOwnerNameAndAvatar(avatarAndLogin: UseFetchAvatarAndLoginResponse) {
        adminDispatch({
          type: AdminStrAction.SaveAvatarAndLogin,
          payload: { avatarAndLogin },
        });
      },
    };
    
  }, [adminDispatch]);
}
