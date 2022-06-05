import { Dispatch, Reducer } from 'react';

export enum AuthStrAction {
  SaveAuthInputsOutput = 'SaveAuthInputsOutput',
  SetDisabledSubmit = 'SetDisabledSubmit',
}

interface AuthInput {
  label: string;
  type: 'password' | 'text';
  value: string;
  required: boolean;
}

interface AuthState {
  inputs: AuthInput[];
  disabledSubmit: boolean;
}

interface SaveAuthInputsOutput {
  type: AuthStrAction.SaveAuthInputsOutput;
  payload: { name: string; value: string };
}

interface SetDisabledSubmit {
  type: AuthStrAction.SetDisabledSubmit;
  payload: { disabledSubmit: boolean };
}

export type AuthReducerActions = SaveAuthInputsOutput | SetDisabledSubmit;

export const authInitState: AuthState = {
  inputs: [
    {
      label: 'login',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'password',
      type: 'password',
      value: '',
      required: true,
    },
  ],
  disabledSubmit: true,
};

export const authReducer: Reducer<AuthState, AuthReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AuthStrAction.SaveAuthInputsOutput:
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

export const saveAuthInputsOutputs = (
  authDispatch: Dispatch<AuthReducerActions>,
  name: string,
  value: string,
) => {
  authDispatch({
    type: AuthStrAction.SaveAuthInputsOutput,
    payload: { name, value },
  });
};
