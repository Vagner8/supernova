import { Dispatch, FormEvent, SetStateAction, useReducer } from 'react';
import styles from './Auth.module.css';
import { ChangeHandler } from '../../share/shareTypes';
import { authReducer, authInitState, AuthStringActions } from './authReducer';
import { fetchData } from '../../api/api';
import { AuthAPI, Method } from '../../api/apiType';
import { Owner } from '../Admin';
import { Button, Input } from 'UIKit';

interface AuthProps {
  setOwner: Dispatch<SetStateAction<Owner>>;
}

export function Auth({ setOwner }: AuthProps) {
  const [authState, dispatch] = useReducer(authReducer, authInitState);

  const onChange: ChangeHandler = ({ target }) => {
    if (target) {
      const { name, value } = target;
      dispatch({
        type: AuthStringActions.OnChangeInputs,
        payload: { inputName: name, inputValue: value },
      });
      dispatch({ type: AuthStringActions.IsSubmitDisabled });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: AuthStringActions.SetIsFetching,
      payload: { isFetching: true },
    });
    const response = await fetchData<Owner>(Method.POST, AuthAPI.Registration);
    dispatch({
      type: AuthStringActions.SetIsFetching,
      payload: { isFetching: false },
    });
    if (!response) {
      return dispatch({
        type: AuthStringActions.SetError,
        payload: {
          error: true,
          message: 'Unexpected error',
          field: '',
        },
      });
    }
    if ('error' in response) {
      return dispatch({ type: AuthStringActions.SetError, payload: response });
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
              label={input.label}
              key={input.label}
              type={input.type}
              value={input.value}
              onChange={onChange}
            />
          ))}
          <Button title="Send" type="submit" />
        </form>
      </div>
    </div>
  );
}
