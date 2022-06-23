import { AdminReducerActions, saveOperationResult } from 'admin/adminReducer';
import { FetcherResult } from 'api/fetcher';
import { Dispatch } from 'react';

interface ResultProcessing {
  result: FetcherResult;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function resultProcessing({ result, adminDispatch}: ResultProcessing) {
  if (!result) {
    return saveOperationResult(adminDispatch, {
      status: 'server error',
      message: 'no result',
    });
  }
  if ('status' in result) {
    return saveOperationResult(adminDispatch, result);
  }
  return result;
}
