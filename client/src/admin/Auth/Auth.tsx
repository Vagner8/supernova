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
    if (authState.formErr.errorMessage) {
      authDispatch({
        type: AuthStrAction.SetFormErr,
        payload: {
          errorField: null,
          errorMessage: null,
        },
      });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetcher<OwnerId>(
      'POST',
      API.Registration,
      adminDispatch,
      {
        name: authState.inputs[0].value,
        password: authState.inputs[1].value,
      },
    );
    if (!res || 'logout' in res) {
      return adminDispatch({ type: AdminStrAction.SetErr, payload: res });
    }
    if ('errorField' in res) {
      return authDispatch({ type: AuthStrAction.SetFormErr, payload: res });
    }
    adminDispatch({ type: AdminStrAction.SetOwnerId, payload: res });
  };

  return (
    <>
      <Linear show={adminState.isFetching}/>
      <div className={styles.Auth}>
        <div>
          <h4>Log in</h4>
          <form onSubmit={onSubmit}>
            {authState.inputs.map((input) => (
              <Input
                key={input.label}
                errorField={authState.formErr.errorField}
                errorMessage={authState.formErr.errorMessage}
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
