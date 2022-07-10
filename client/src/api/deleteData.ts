import { SaveOperationResult, SetIsFetching } from 'admin/adminState';
import { fetcher } from './fetcher';

interface DeleteData {
  url: string;
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
  selectTableRowsIds?: string[]
}

export async function deleteData({
  url,
  setIsFetching,
  saveOperationResult,
  selectTableRowsIds,
}: DeleteData) {
  await fetcher({
    method: 'DELETE',
    url,
    setIsFetching,
    saveOperationResult,
    body: selectTableRowsIds
  });
}