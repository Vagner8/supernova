import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { Dispatch } from 'react';
import { OperationResultType } from '../../../common/src/operationResultType';

// export type FetcherResult = undefined | OperationResultType | Object;

export enum GoTo {
  Login = '/login',
  GetUsers = '/users',
  CreateUser = '/users/new',
  UpdateUsers = '/users/update',
  Aggregate = '/users/aggregate/',
}
export interface Fetcher {
  method: 'POST' | 'DELETE' | 'PUT' | 'GET';
  url: string;
  adminDispatch: Dispatch<AdminReducerActions>;
  body?: any;
}

export async function fetcher<Res>({
  method,
  url,
  adminDispatch,
  body,
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
      | undefined
      | OperationResultType
      | Res;
    if (!json) {
      saveOperationResult(adminDispatch, {
        status: 'server error',
        message: 'no result',
      });
      return undefined;
    }
    if ('status' in json) {
      saveOperationResult(adminDispatch, json);
      return undefined;
    }
    return json;
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
