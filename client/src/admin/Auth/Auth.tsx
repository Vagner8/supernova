import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  useCallback,
  useReducer,
} from 'react';
import styles from './auth.module.css';
import {
  authReducer,
  authInitState,
  saveAuthInputsOutputs,
} from 'admin/Auth/authReducer';
import { Button, Icon, Linear, Snackbar, InputMemo } from 'UIKit';
import {
  AdminReducerActions,
  AdminState,
  deleteOperationResult,
} from 'admin/adminReducer';
import { login } from './authApi';

interface AuthProps {
  adminDispatch: Dispatch<AdminReducerActions>;
  adminState: AdminState;
}

export function Auth({ adminDispatch, adminState }: AuthProps) {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      saveAuthInputsOutputs(authDispatch, name, value);
      if (!adminState.operationResult) return;
      deleteOperationResult(adminDispatch);
    },
    [adminDispatch, adminState.operationResult],
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(adminDispatch, {
      login: authState.inputs[0].value,
      password: authState.inputs[1].value,
    });
  };

  return (
    <>
      <Linear show={adminState.isFetching} />
      <div className={styles.Auth}>
        <div>
          <h4>Log in</h4>
          <form onSubmit={onSubmit}>
            {authState.inputs.map((input) => (
              <InputMemo
                key={input.label}
                errorMessage={adminState.operationResult?.message}
                errorField={adminState.operationResult?.field}
                label={input.label}
                type={input.type}
                value={input.value}
                required={input.required}
                onChange={onChange}
              />
            ))}
            <Button title="Send" type="submit" icon={<Icon icon="send" />} />
          </form>
        </div>
      </div>
      <Snackbar
        status={adminState.operationResult?.status}
        message={adminState.operationResult?.message}
        filed={adminState.operationResult?.field}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
