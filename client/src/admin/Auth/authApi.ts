import {
  SaveOperationResult,
  SetAdminState,
} from 'admin/adminState';
import { fetcher } from 'api/fetcher';

interface Login {
  body: {
    login: string;
    password: string;
  };
  setAdminState: ({ isFetching }: SetAdminState['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function login({
  setAdminState,
  saveOperationResult,
  body,
}: Login) {
  const response = (await fetcher({
    method: 'POST',
    url: '/login',
    setAdminState,
    saveOperationResult,
    body,
  })) as undefined | { adminId: string };
  if (!response) return;
  localStorage.setItem('adminId', response.adminId)
}
