import { FormErr } from 'api/fetcher';
import { Reducer } from 'react';

export enum AuthStrAction {
  SetOnChange = 'SetOnChange',
  SetDisabledSubmit = 'SetDisabledSubmit',
  SetFormErr = 'SetFormErr'
}

interface AuthInput {
  label: string;
  type?: 'password';
  value: string;
}

interface AuthState {
  inputs: AuthInput[];
  disabledSubmit: boolean;
  formErr: FormErr;
}

interface SetOnChange {
  type: AuthStrAction.SetOnChange;
  payload: { name: string; value: string };
}

interface SetDisabledSubmit {
  type: AuthStrAction.SetDisabledSubmit;
  payload: { disabledSubmit: boolean };
}

interface SetFormErr {
  type: AuthStrAction.SetFormErr,
  payload: FormErr
}

export type AuthReducerActions = SetOnChange | SetDisabledSubmit | SetFormErr;

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
  formErr: {
    errorMessage: null,
    errorField: null,
  },
};

export const authReducer: Reducer<AuthState, AuthReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AuthStrAction.SetOnChange:
      const { name, value } = action.payload;
      return {
        ...state,
        inputs: state.inputs.map((input) => {
          if (input.label === name) {
            return {
              ...input,
              value,
              error: false,
              helperText: ' ',
            };
          }
          return input;
        }),
      };
    case AuthStrAction.SetDisabledSubmit:
      return {
        ...state,
        disabledSubmit: action.payload.disabledSubmit,
      };
    case AuthStrAction.SetFormErr:
      return {
        ...state,
        formErr: {
          ...state.formErr,
          errorMessage: action.payload.errorMessage,
          errorField: action.payload.errorField
        }
      }
    default:
      return state;
  }
};
