import { SaveOperationResult, SetIsFetching } from 'admin/adminState';
import { OperationResultType } from '../../../common/src/operationResultType';

export enum GoTo {
  Login = '/login',
  GetUsers = '/users',
  CreateUser = '/users/new',
  UpdateUsers = '/users/update',
  UserAggregate = '/users/aggregate',
  ProductAggregate = '/product/aggregate',
}
export interface Fetcher {
  method: 'POST' | 'DELETE' | 'PUT' | 'GET';
  url: string;
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
  body?: any;
}

export async function fetcher<Res>({
  method,
  url,
  setIsFetching,
  saveOperationResult,
  body,
}: Fetcher) {
  setIsFetching({ isFetching: true });
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        credentials: 'include',
        adminId: localStorage.getItem('adminId') || 'idle',
      },
    });
    const json = (await response.json()) as
      | undefined
      | OperationResultType
      | Res;
    if (!json) {
      saveOperationResult({
        operationResult: {
          status: 'server error',
          message: 'no result',
        },
      });
      return undefined;
    }
    if ('status' in json) {
      saveOperationResult({ operationResult: json });
      return undefined;
    }
    return json;
  } catch (err) {
    console.error(err);
    saveOperationResult({
      operationResult: {
        status: 'server error',
        message: 'unexpected error',
      },
    });
  } finally {
    setIsFetching({ isFetching: false });
  }
}
