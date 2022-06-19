import { AdminReducerActions, saveOwnerId } from 'admin/adminReducer';
import { AddressTo, fetcher } from 'api/fetcher';
import { Dispatch } from 'react';

export async function login(
  adminDispatch: Dispatch<AdminReducerActions>,
  body: {
    login: string,
    password: string,
  }
) {
  const res = (await fetcher({
    method: 'POST',
    url: '/login',
    adminDispatch,
    message: 'you are login',
    body,
  })) as undefined | { userId: string };
  if (!res) return;
  saveOwnerId(adminDispatch, res.userId);
}
