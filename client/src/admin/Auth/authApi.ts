import { AdminReducerActions, saveOwnerId } from 'admin/adminReducer';
import { UrlAddress, fetcher } from 'api/fetcher';
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
    url: UrlAddress.Login,
    adminDispatch,
    message: 'you are login',
    body,
  })) as undefined | { ownerId: string };
  if (!res) return;
  saveOwnerId(adminDispatch, res.ownerId);
}
