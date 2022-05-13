import { Reducer } from 'react';

export enum AuthStringActions {
  SetError = 'SetError',
  OnChangeInputs = 'OnChangeInputs',
  IsSubmitDisabled = 'IsSubmitDisabled',
  SetIsFetching = 'SetIsFetching',
}

interface AuthInput {
  label: string;
  type?: 'password';
  value: string;
}

interface SetError {
  type: AuthStringActions.SetError;
  payload: { error: boolean; message: string; field: string };
}

interface ChangeInputs {
  type: AuthStringActions.OnChangeInputs;
  payload: { inputName: string; inputValue: string };
}

interface isSubmitDisabled {
  type: AuthStringActions.IsSubmitDisabled;
}

interface SetIsFetching {
  type: AuthStringActions.SetIsFetching;
  payload: { isFetching: boolean };
}

type AuthReducerActions =
  | ChangeInputs
  | isSubmitDisabled
  | SetError
  | SetIsFetching;

interface AuthState {
  inputs: AuthInput[];
  disabledSubmit: boolean;
  isFetching: boolean;
  error: boolean;
  message: string;
}

export const authInitState: AuthState = {
  inputs: [
    {
      label: 'name',
      value: '',
    },
    {
      label: 'password',
      type: 'password',
      value: '',
    },
  ],
  disabledSubmit: true,
  isFetching: false,
  error: false,
  message: '',
};

export const authReducer: Reducer<AuthState, AuthReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AuthStringActions.SetError:
      const { error, message } = action.payload;
      return {
        ...state,
        error,
        message,
      };
    case AuthStringActions.OnChangeInputs:
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        inputs: state.inputs.map((input) => {
          if (input.label === inputName) {
            return {
              ...input,
              value: inputValue,
              error: false,
              helperText: ' ',
            };
          }
          return input;
        }),
      };
    case AuthStringActions.IsSubmitDisabled:
      return {
        ...state,
        disabledSubmit: !state.inputs.every((input) => input.value),
      };
    case AuthStringActions.SetIsFetching: {
      return {
        ...state,
        isFetching: action.payload.isFetching,
        disabledSubmit: action.payload.isFetching,
      };
    }
    default:
      return state;
  }
};
