import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  useCallback,
  useReducer,
} from 'react';
import styles from './auth.module.css';
import {
  authReducer,
  authInitState,
  saveAuthInputsOutputs,
} from 'admin/Auth/authReducer';
import { Button, Icon, Linear, InputMemo } from 'UIKit';
import { login } from './authApi';
import { OperationResultsSheet } from 'admin/OperationResultsSheet/OperationResultsSheet';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { AdminReducerActions, AdminState } from 'admin/adminState';
import { useAdminDispatch, useEventsSelector } from 'hooks';

interface AuthProps {
  isFetching: AdminState['isFetching'];
  operationResults: AdminState['operationResults'];
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Auth({
  validateErrors,
  isFetching,
  operationResults,
  adminDispatch,
}: AuthProps) {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);
  const actionAdmin = useAdminDispatch(adminDispatch);
  const { selectFieldErrorByLabel } = useEventsSelector();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      saveAuthInputsOutputs(authDispatch, name, value);
      actionAdmin.deleteAllOperationResults();
    },
    [actionAdmin],
  );

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({
      body: {
        login: authState.inputs[0].value,
        password: authState.inputs[1].value,
      },
      saveAdminId: actionAdmin.saveAdminId,
      saveOperationResult: actionAdmin.saveOperationResult,
      setIsFetching: actionAdmin.setIsFetching,
    });
  };

  return (
    <>
      <Linear show={isFetching} />
      <div className={styles.Auth}>
        <div>
          <h4>Log in</h4>
          <form>
            {authState.inputs.map((input) => {
              const error = selectFieldErrorByLabel(
                input.label,
                validateErrors,
              );
              return (
                <InputMemo
                  key={input.label}
                  label={input.label}
                  type={input.type}
                  value={input.value}
                  required={input.required}
                  onChange={onChange}
                  messageError={error?.message}
                  fieldError={error?.field}
                />
              );
            })}
            <Button
              title="Send"
              icon={<Icon icon="send" type="in-button" />}
              onClick={onClick}
            />
          </form>
        </div>
      </div>
      <OperationResultsSheet
        adminDispatch={adminDispatch}
        operationResults={operationResults}
      />
    </>
  );
}
