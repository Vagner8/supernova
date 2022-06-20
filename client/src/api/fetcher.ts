import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { Dispatch } from 'react';
import { CustomErrorType } from './../../../common/src/customErrorType'

export enum AddressTo {
  Login = '/login',
  GetUsers = '/users',
  CreateUser = '/users/new',
  UpdateUsers = '/users/update',
}

interface Fetcher {
  method: 'POST' | 'DELETE' | 'PUT' | 'GET';
  url: string;
  adminDispatch: Dispatch<AdminReducerActions>;
  body?: any;
  message: string;
}

export async function fetcher({
  method,
  url,
  adminDispatch,
  body,
  message,
}: Fetcher) {
  setIsFetching(adminDispatch, true);
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        credentials: 'include',
        adminId: localStorage.getItem('adminId') || 'idle',
      },
    });
    const json = (await response.json()) as
      | null
      | CustomErrorType
      | Object;
    if (!json) {
      saveOperationResult(adminDispatch, {
        status: 'error',
        message: 'unexpected error',
        field: null,
        logout: false,
      });
      return null;
    }
    if ('errorName' in json) {
      if (json.errorName === 'token warning') {
        saveOperationResult(adminDispatch, {
          status: 'warning',
          errorName: json.errorName,
          message: json.message,
          field: json.field,
          logout: json.logout,
        });
        return null;
      }
      saveOperationResult(adminDispatch, {
        status: 'error',
        errorName: json.errorName,
        message: json.message,
        field: json.field,
        logout: json.logout,
      });
      return null;
    }
    saveOperationResult(adminDispatch, {
      status: 'success',
      message,
      field: null,
      logout: false,
    });
    return json;
  } catch (err) {
    console.error(err);
    saveOperationResult(adminDispatch, {
      status: 'error',
      message: 'server error',
      field: null,
      logout: false,
    });
  } finally {
    setIsFetching(adminDispatch, false);
  }
}
