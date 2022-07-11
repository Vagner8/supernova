import { AdminState } from 'admin/adminState/adminReducer';
import { useEffect, useState } from 'react';
import { ValidateError } from '../../../common/src/commonTypes';

export function useValidateErrors(
  operationResults: AdminState['operationResults'],
) {
  const [validateErrors, setValidateErrors] =
    useState<ValidateError[] | undefined>(undefined);

  useEffect(() => {
    setValidateErrors(
      operationResults?.filter((result) => result.validateErrors)[0]
        ?.validateErrors,
    );
  }, [operationResults]);

  return validateErrors;
}
