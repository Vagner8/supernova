import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { Dispatch } from 'react';

export function security(
  response: any,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  if (!response || 'logout' in response) {
    return adminDispatch({
      type: AdminStrAction.SaveError,
      payload: response,
    });
  }
}
