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
    const json = await response.json() as undefined | Err | Object;
    if (!json || 'logout' in json) {
      adminDispatch({
        type: AdminStrAction.SaveFetchResult,
        payload: { fetchResult: json },
      });
      return undefined
    }
    adminDispatch({
      type: AdminStrAction.SaveFetchResult,
      payload: {
        fetchResult: { status: 'ok', message },
      },
    });
    return json;
  } catch (err) {
    console.log(err);
    adminDispatch({
      type: AdminStrAction.SaveFetchResult,
      payload: {
        fetchResult: { status: 'error', message: 'server error' },
      },
    });
  } finally {
    adminDispatch({
      type: AdminStrAction.SetIsFetching,
      payload: { isFetching: false },
    });
  }
}
