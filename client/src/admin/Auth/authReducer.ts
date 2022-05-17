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

interface AuthState {
  inputs: AuthInput[];
  disabledSubmit: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  errorField: string | null;
}

interface SetError {
  type: AuthStringActions.SetError;
  payload: Pick<AuthState, 'errorMessage' | 'errorField'>;
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
  payload: Pick<AuthState, 'isFetching'>;
}

type AuthReducerActions =
  | ChangeInputs
  | isSubmitDisabled
  | SetError
  | SetIsFetching;

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
  errorMessage: null,
  errorField: null,
};

export const authReducer: Reducer<AuthState, AuthReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AuthStringActions.SetError:
      const { errorMessage, errorField } = action.payload;
      return {
        ...state,
        errorMessage,
        errorField,
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
