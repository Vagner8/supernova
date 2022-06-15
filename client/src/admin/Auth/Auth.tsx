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
import { AdminReducerActions, AdminState, deleteAllOperationResults, deleteOperationResult } from 'admin/adminReducer';
import { login } from './authApi';

interface AuthProps {
  isFetching: AdminState['isFetching'];
  errorMessage: string | undefined;
  errorField: string | null | undefined;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Auth({
  errorMessage,
  errorField,
  isFetching,
  adminDispatch,
}: AuthProps) {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    saveAuthInputsOutputs(authDispatch, name, value);
    deleteAllOperationResults(adminDispatch)
  }, [adminDispatch]);

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(adminDispatch, {
      login: authState.inputs[0].value,
      password: authState.inputs[1].value,
    });
  };

  return (
    <>
      <Linear show={isFetching} />
      <div className={styles.Auth}>
        <div>
          <h4>Log in</h4>
          <form>
            {authState.inputs.map((input) => (
              <InputMemo
                key={input.label}
                errorMessage={errorMessage}
                errorField={errorField}
                label={input.label}
                type={input.type}
                value={input.value}
                required={input.required}
                onChange={onChange}
              />
            ))}
            <Button
              title="Send"
              icon={<Icon icon="send" type="in-button" />}
              onClick={onClick}
            />
          </form>
        </div>
      </div>
      {/* <Snackbar
        status={adminState.operationResult?.status}
        message={adminState.operationResult?.message}
        filed={adminState.operationResult?.field}
        adminDispatch={adminDispatch}
      /> */}
    </>
  );
}
