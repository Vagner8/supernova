import { AdminState } from 'admin/adminReducer';

export function useOperationResultWithField(
  operationResults: AdminState['operationResults'],
) {
  const operationResultWithField = {
    errorMessage: '',
    errorField: '',
  };
  if (!operationResults) return
  operationResults.forEach((result) => {
    if (result.field) {
      operationResultWithField.errorMessage = result.message;
      operationResultWithField.errorField = result.field;
    }
  });

  return operationResultWithField;
}
