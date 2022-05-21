import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { Dispatch } from 'react';

export interface Err {
  errorMessage: string | null;
  logout: boolean;
}

export interface FormErr {
  errorMessage: string | null;
  errorField: string | null;
}

export enum AuthAPI {
  Registration = '/auth/registration',
  Verify = '/auth/verify',
}


export async function fetcher<Data>(
  method: 'POST' | 'DELETE' | 'PUT' | 'GET',
  url: string,
  adminDispatch: Dispatch<AdminReducerActions>,
  body?: any,
): Promise<Err | FormErr | Data | undefined> {
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
