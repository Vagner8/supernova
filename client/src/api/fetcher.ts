import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { resultProcessing } from 'helpers';
import { Dispatch } from 'react';
import { OperationResultType } from '../../../common/src/operationResultType';

export type FetcherResult = undefined | OperationResultType | Object;
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
}

export async function fetcher({ method, url, adminDispatch, body }: Fetcher) {
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
    return resultProcessing({
      result: (await response.json()) as FetcherResult,
      adminDispatch,
    });
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
