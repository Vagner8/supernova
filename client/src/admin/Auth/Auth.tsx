import { ChangeEvent, Dispatch, FormEvent, useReducer } from 'react';
import styles from 'admin/Auth/Auth.module.css';
import {
  authReducer,
  authInitState,
  AuthStrAction,
} from 'admin/Auth/authReducer';
import { Button, Input, Icon } from 'UIKit';
import { AuthAPI, fetchData } from 'api/fetchData';
import {
  AdminReducerActions,
  AdminState,
  AdminStrAction,
  OwnerId,
} from 'admin/adminReducer';

interface AuthProps {
  adminDispatch: Dispatch<AdminReducerActions>;
  adminState: AdminState;
}

export function Auth({ adminDispatch, adminState }: AuthProps) {
  const [authState, dispatch] = useReducer(authReducer, authInitState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: AuthStrAction.SetOnChange,
      payload: { name, value },
    });
    if (authState.inputs.every((item) => item.value)) {
      dispatch({
        type: AuthStrAction.SetDisabledSubmit,
        payload: { disabledSubmit: false },
      });
    }
    if (authState.formErr.errorMessage) {
      dispatch({
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
    const response = await fetchData<OwnerId>(
      'POST',
      AuthAPI.Registration,
      adminDispatch,
      {
        name: authState.inputs[0].value,
        password: authState.inputs[1].value,
      },
    );
    // adminDispatch({ type: AdminStrAction.SetResponse, payload: response });
    // adminDispatch({
    //   type: AdminStrAction.SetIsFetching,
    //   payload: { isFetching: false },
    // });
  };

  return (
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
  );
}
