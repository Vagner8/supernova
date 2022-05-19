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


export async function fetchData<Data>(
  method: 'POST' | 'DELETE' | 'PUT' | 'GET',
  url: string,
  adminDispatch: Dispatch<AdminReducerActions>,
  body?: any,
): Promise<Err | FormErr | Data | undefined> {
  try {
    adminDispatch({
      type: AdminStrAction.SetIsFetching,
      payload: { isFetching: true },
    });
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        Cookie: 'accessToken=value',
      },
    });
    adminDispatch({
      type: AdminStrAction.SetIsFetching,
      payload: { isFetching: false },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
