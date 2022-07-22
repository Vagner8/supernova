import { Reducer } from 'react';
import {
  AdminReducerActions,
  AdminStrAction,
  AdminState,
  setAdminState,
  saveOperationResult,
  deleteOperationResult,
  authOnChange,
} from './adminReducerHandlers';

export const adminInitState: AdminState = {
  isFetching: false,
  operationResults: null,
  adminLogin: null,
  adminAvatar: null,
  loginInputs: [
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
};

export const adminReducer: Reducer<AdminState, AdminReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case AdminStrAction.SetAdminState: {
      return setAdminState(state, action.payload);
    }
    case AdminStrAction.SaveOperationResult: {
      return saveOperationResult(state, action.payload);
    }
    case AdminStrAction.DeleteOperationResult: {
      return deleteOperationResult(state, action.payload);
    }
    case AdminStrAction.AuthOnChange: {
      return authOnChange(state, action.payload)
    }
    default:
      return state;
  }
};
