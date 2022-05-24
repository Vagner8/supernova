import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { Dispatch } from 'react';

export interface Err {
  status: 400 | 403 | 500,
  text: string,
  logout: boolean,
  field: string | null
}

export enum API {
  Registration = '/auth/registration',
  Owner = '/owner'
}

export async function fetcher<D>(
  method: 'POST' | 'DELETE' | 'PUT' | 'GET',
  url: string,
  adminDispatch: Dispatch<AdminReducerActions>,
  body?: any,
): Promise<Err | D | undefined> {
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
          'credentials': 'include',
          'ownerId': localStorage.getItem('ownerId') || 'idle'
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err)
    } finally {
      adminDispatch({
        type: AdminStrAction.SetIsFetching,
        payload: { isFetching: false },
      });
    }
}
