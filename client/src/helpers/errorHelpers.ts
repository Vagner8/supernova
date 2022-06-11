import { AdminReducerActions, saveOperationResult } from 'admin/adminReducer';
import { Dispatch } from 'react';

const errorOptions = (
  adminDispatch: Dispatch<AdminReducerActions>,
  message: string,
) => {
  saveOperationResult(adminDispatch, {
    status: 'error',
    message,
    logout: false,
    field: null,
  });
};

export function firebaseError(
  adminDispatch: Dispatch<AdminReducerActions>,
  message: string,
) {
  errorOptions(adminDispatch, message);
}

export function updateError(
  adminDispatch: Dispatch<AdminReducerActions>,
  message: string,
) {
  errorOptions(adminDispatch, message);
}
