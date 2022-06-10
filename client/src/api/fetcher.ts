import {
  AdminReducerActions,
  saveOperationResult,
  setIsFetching,
} from 'admin/adminReducer';
import { Dispatch } from 'react';

export interface Err {
  status: 400 | 403 | 500;
  message: string;
  logout: boolean;
  field: string | null;
}

export enum UrlAddress {
  Login = '/auth/login',
  Owner = '/owner',
  OwnerUpdate = '/owner/update',
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
        ownerId: localStorage.getItem('ownerId') || 'idle',
      },
    });
    const json = (await response.json()) as
      | undefined
      | Err
      | Object;
    if (!json) {
      saveOperationResult(adminDispatch, {
        status: 'error',
        message: 'unexpected error',
        field: null,
        logout: false,
      });
      return undefined;
    }
    if ('logout' in json) {
      saveOperationResult(adminDispatch, {
        status: 'error',
        message: json.message,
        field: json.field,
        logout: json.logout,
      });
      return undefined;
    }
    saveOperationResult(adminDispatch, {
      status: 'success',
      message,
      field: null,
      logout: false,
    });
    return json;
  } catch (err) {
    console.log(err);
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
