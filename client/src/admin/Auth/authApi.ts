import {
  SaveAdminId,
  SaveOperationResult,
  SetIsFetching,
} from 'admin/adminState';
import { fetcher } from 'api/fetcher';

interface Login {
  body: {
    login: string;
    password: string;
  };
  saveAdminId: ({ adminId }: SaveAdminId['payload']) => void;
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function login({
  saveAdminId,
  setIsFetching,
  saveOperationResult,
  body,
}: Login) {
  const response = (await fetcher({
    method: 'POST',
    url: '/login',
    setIsFetching,
    saveOperationResult,
    body,
  })) as undefined | { adminId: string };
  if (!response) return;
  saveAdminId({ adminId: response.adminId });
}
