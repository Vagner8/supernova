import { ValidateError } from "../../../common/src/operationResultType";

export const filterValidateErrors = (
  label: string,
  validateErrors: ValidateError[] | undefined,
) => {
  return validateErrors?.filter((err) => err.field === label)[0];
}