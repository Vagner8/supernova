import { ChangeEvent, Dispatch, FormEvent, useReducer } from 'react';
import styles from './auth.module.css';
import {
  authReducer,
  authInitState,
  AuthStrAction,
} from 'admin/Auth/authReducer';
import { Button, Input, Icon, Linear } from 'UIKit';
import {
  AdminReducerActions,
  AdminState,
  AdminStrAction,
  OwnerId,
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
    if (!adminState.error) return
    adminDispatch({type: AdminStrAction.DeleteError})
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetcher<OwnerId>(
      'POST',
      API.Registration,
      adminDispatch,
      {
        login: authState.inputs[0].value,
        password: authState.inputs[1].value,
      },
    );
    if (!response || 'logout' in response) {
      return adminDispatch({
        type: AdminStrAction.SaveError,
        payload: {error: response},
      });
    }
    adminDispatch({ type: AdminStrAction.SaveOwnerId, payload: response });
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
                error={adminState.error}
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
    </>
  );
}
