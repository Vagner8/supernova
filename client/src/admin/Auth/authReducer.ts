import { Reducer } from 'react';

export enum AuthStrAction {
  SetOnChange = 'SetOnChange',
  SetDisabledSubmit = 'SetDisabledSubmit',
}

interface AuthInput {
  label: string;
  type: 'password' | 'text';
  value: string;
  required: boolean
}

interface AuthState {
  inputs: AuthInput[];
  disabledSubmit: boolean;
}

interface SetOnChange {
  type: AuthStrAction.SetOnChange;
  payload: { name: string; value: string };
}

interface SetDisabledSubmit {
  type: AuthStrAction.SetDisabledSubmit;
  payload: { disabledSubmit: boolean };
}

export type AuthReducerActions = SetOnChange | SetDisabledSubmit;

export const authInitState: AuthState = {
  inputs: [
    {
      label: 'login',
      type: 'text',
      value: '',
      required: true
    },
    {
      label: 'password',
      type: 'password',
      value: '',
      required: true
    },
  ],
  disabledSubmit: true,
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
    default:
      return state;
  }
};
