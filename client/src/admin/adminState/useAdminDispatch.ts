import {
  AdminReducerActions,
  AdminStrAction,
  DeleteOperationResult,
  SaveOperationResult,
  SetAdminState,
  AuthOnChange
} from 'admin/adminState';
import { Dispatch, useMemo } from 'react';

export function useAdminDispatch(adminDispatch: Dispatch<AdminReducerActions>) {
  return useMemo(() => {
    return {
      authOnChange({ name, value }: AuthOnChange['payload']) {
        adminDispatch({
          type: AdminStrAction.AuthOnChange,
          payload: { name, value }
        })
      },

      setAdminState(changes: SetAdminState['payload']) {
        adminDispatch({
          type: AdminStrAction.SetAdminState,
          payload: changes
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

    };
  }, [adminDispatch]);
}
