import { AdminReducerActions, saveAdminId } from 'admin/adminReducer';
import { fetcher } from 'api/fetcher';
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
    body,
  })) as undefined | { adminId: string };
  if (!res) return;
  saveAdminId(adminDispatch, res.adminId);
}
