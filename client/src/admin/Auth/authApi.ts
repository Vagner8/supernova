import { AdminReducerActions, saveOwnerId } from 'admin/adminReducer';
import { API, fetcher } from 'api/fetcher';
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
    url: API.Login,
    adminDispatch,
    message: 'Success',
    body,
  })) as undefined | { ownerId: string };
  if (!res) return;
  saveOwnerId(adminDispatch, res.ownerId);
}
