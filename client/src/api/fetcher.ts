import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { Dispatch } from 'react';
import { OperationResultType } from '../../../common/src/operationResultType';

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

type Result = undefined | OperationResultType | Object

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
    const result = (await response.json()) as Result
    if (!result) {
      return saveOperationResult(adminDispatch, {
        status: 'server error',
        message: 'unexpected error',
      });
    }
    if ('status' in result) {
      return saveOperationResult(adminDispatch, result);
    }
    saveOperationResult(adminDispatch, {
      status: 'success',
      message,
    });
    return result;
  } catch (err) {
    console.error(err);
    saveOperationResult(adminDispatch, {
      status: 'server error',
      message: 'unexpected error',
    });
  } finally {
    setIsFetching(adminDispatch, false);
  }
}
