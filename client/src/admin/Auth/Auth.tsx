import { ChangeEvent, Dispatch, FormEvent, useReducer } from 'react';
import styles from './auth.module.css';
import {
  authReducer,
  authInitState,
  AuthStrAction,
} from 'admin/Auth/authReducer';
import { Button, Input, Icon, Linear, Snackbar } from 'UIKit';
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authDispatch({
      type: AuthStrAction.SetOnChange,
      payload: { name, value },
    });
    if (authState.inputs.every((item) => item.value)) {
      authDispatch({
        type: AuthStrAction.SetDisabledSubmit,
        payload: { disabledSubmit: false },
      });
    }
    if (!adminState.fetchResult) return;
    adminDispatch({ type: AdminStrAction.DeleteFetchResult });
  };

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
              <Input
                key={input.label}
                errorMessage={adminState.fetchResult?.message}
                errorField={adminState.fetchResult?.field}
                label={input.label}
                type={input.type}
                value={input.value}
                onChange={onChange}
              />
            ))}
            <Button
              disabled={authState.disabledSubmit}
              title="Send"
              type="submit"
              icon={<Icon icon="send" />}
            />
          </form>
        </div>
      </div>
      <Snackbar
        status={adminState.fetchResult?.status}
        message={adminState.fetchResult?.message}
        filed={adminState.fetchResult?.field}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
