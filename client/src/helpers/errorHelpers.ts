import { AdminReducerActions, saveOperationResult } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { ValidateError } from '../../../common/src/operationResultType';

const errorOptions = (
  adminDispatch: Dispatch<AdminReducerActions>,
  message: string,
) => {
  saveOperationResult(adminDispatch, {
    status: 'firebase error',
    message,
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

export function filterValidateErrors(
  label: string,
  validateErrors: ValidateError[] | undefined,
) {
  return validateErrors?.filter((err) => err.field === label)[0];
}
