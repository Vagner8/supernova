import { ChangeEvent, Dispatch, MouseEvent, useCallback } from 'react';
import styles from './auth.module.css';
import { Button, Icon, Linear, InputMemo } from 'UIKit';
import { login } from './authApi';
import { OperationResultsSheet } from 'admin/OperationResultsSheet/OperationResultsSheet';
import {
  AdminReducerActions,
  AdminState,
  useAdminDispatch,
} from 'admin/adminState';
import { useEventsSelector } from 'hooks';
import { OperationResultType } from '../../../../common/src/commonTypes';

interface AuthProps {
  isFetching: AdminState['isFetching'];
  operationResults: AdminState['operationResults'];
  loginInputs: AdminState['loginInputs']
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Auth({
  validateErrors,
  isFetching,
  operationResults,
  loginInputs,
  adminDispatch,
}: AuthProps) {
  const actionAdmin = useAdminDispatch(adminDispatch);
  const { selectFieldErrorByLabel } = useEventsSelector();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      actionAdmin.authOnChange({ name: e.target.name, value: e.target.value });
      actionAdmin.setAdminState({ operationResults: null });
    },
    [actionAdmin],
  );

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login({
      body: {
        login: loginInputs[0].value,
        password: loginInputs[1].value,
      },
      saveOperationResult: actionAdmin.saveOperationResult,
      setAdminState: actionAdmin.setAdminState,
    });
  };

  return (
    <>
      <Linear show={isFetching} />
      <div className={styles.Auth}>
        <div>
          <h4>Log in</h4>
          <form>
            {loginInputs.map((input) => {
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
