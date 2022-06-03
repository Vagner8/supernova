import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { Dispatch } from 'react';

export interface Err {
  status: 400 | 403 | 500;
  message: string;
  logout: boolean;
  field: string | null;
}

export enum API {
  Registration = '/auth/login',
  Owner = '/owner',
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
  adminDispatch({
    type: AdminStrAction.SetIsFetching,
    payload: { isFetching: true },
  });
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
    const json = (await response.json()) as undefined | Err | Object;
    if (!json) {
      adminDispatch({
        type: AdminStrAction.SaveOperationResult,
        payload: {
          operationResult: {
            status: 'error',
            message: 'unexpected error',
            field: null,
            logout: false,
          },
        },
      });
      return undefined;
    }
    if ('logout' in json) {
      adminDispatch({
        type: AdminStrAction.SaveOperationResult,
        payload: {
          operationResult: {
            status: 'error',
            message: json.message,
            field: json.field,
            logout: json.logout,
          },
        },
      });
      return undefined;
    }
    adminDispatch({
      type: AdminStrAction.SaveOperationResult,
      payload: {
        operationResult: {
          status: 'ok',
          message,
          field: null,
          logout: false,
        },
      },
    });
    return json;
  } catch (err) {
    console.log(err);
    adminDispatch({
      type: AdminStrAction.SaveOperationResult,
      payload: {
        operationResult: {
          status: 'error',
          message: 'server error',
          field: null,
          logout: false,
        },
      },
    });
  } finally {
    adminDispatch({
      type: AdminStrAction.SetIsFetching,
      payload: { isFetching: false },
    });
  }
}
