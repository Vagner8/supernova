import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useReducer } from 'react';
import styles from 'admin/Auth/Auth.module.css';
import { authReducer, authInitState, AuthStringActions } from 'admin/Auth/authReducer';
import { Owner } from 'admin/Admin';
import { Button, Input, Icon } from 'UIKit';
import { postData } from 'api/api';
import { AuthAPI, Method } from 'api/apiType';

interface AuthProps {
  setOwner: Dispatch<SetStateAction<Owner>>;
}

export function Auth({ setOwner }: AuthProps) {
  const [authState, dispatch] = useReducer(authReducer, authInitState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const { name, value } = e.target;
      dispatch({
        type: AuthStringActions.OnChangeInputs,
        payload: { inputName: name, inputValue: value },
      });
      dispatch({ type: AuthStringActions.IsSubmitDisabled });
      if (authState.errorMessage) {
        dispatch({
          type: AuthStringActions.SetError,
          payload: {
            errorField: null,
            errorMessage: null,
          },
        });
      }
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: AuthStringActions.SetIsFetching,
      payload: { isFetching: true },
    });
    const response = await postData<Owner>(Method.POST, AuthAPI.Registration, {
      name: authState.inputs[0].value,
      password: authState.inputs[1].value,
    });
    dispatch({
      type: AuthStringActions.SetIsFetching,
      payload: { isFetching: false },
    });
    if (!response) {
      return dispatch({
        type: AuthStringActions.SetError,
        payload: {
          errorMessage: 'Unexpected error',
          errorField: null,
        },
      });
    }
    if ('errorMessage' in response) {
      dispatch({ type: AuthStringActions.SetError, payload: response });
      return;
    }
    setOwner(response);
  };

  return (
    <div className={styles.Auth}>
      <div>
        <h4>Log in</h4>
        <form onSubmit={onSubmit}>
          {authState.inputs.map((input) => (
            <Input
              key={input.label}
              errorField={authState.errorField}
              errorMessage={authState.errorMessage}
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
