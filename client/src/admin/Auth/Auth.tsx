import { ChangeEvent, Dispatch, FormEvent, useCallback, useReducer } from 'react';
import styles from './auth.module.css';
import {
  authReducer,
  authInitState,
  AuthStrAction,
} from 'admin/Auth/authReducer';
import { Button, Icon, Linear, Snackbar, InputMemo } from 'UIKit';
import {
  AdminReducerActions,
  AdminState,
  AdminStrAction,
} from 'admin/adminReducer';
import { API, fetcher } from 'api/fetcher';

interface AuthProps {
  adminDispatch: Dispatch<AdminReducerActions>;
  adminState: AdminState;
}

export function Auth({ adminDispatch, adminState }: AuthProps) {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);
  // const [isPending, startTransition] = useTransition()

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authDispatch({
      type: AuthStrAction.SetOnChange,
      payload: { name, value },
    });
    if (!adminState.operationResult) return;
    adminDispatch({ type: AdminStrAction.DeleteOperationResult });
  }, [adminDispatch, adminState.operationResult]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = (await fetcher({
      method: 'POST',
      url: API.Registration,
      adminDispatch,
      message: 'Success',
      body: {
        login: authState.inputs[0].value,
        password: authState.inputs[1].value,
      },
    })) as undefined | { ownerId: string };
    if (!res) return;
    adminDispatch({
      type: AdminStrAction.SaveOwnerid,
      payload: { ownerId: res.ownerId },
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
            <Button
              title="Send"
              type="submit"
              icon={<Icon icon="send" />}
            />
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
