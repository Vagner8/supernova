import { SaveOperationResult, SetAdminState } from 'admin/adminState';
import { fetcher } from './fetcher';

interface DeleteData {
  url: string;
  setAdminState: ({ isFetching }: SetAdminState['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
  selectTableRowsIds?: string[]
}

export async function deleteData({
  url,
  setAdminState,
  saveOperationResult,
  selectTableRowsIds,
}: DeleteData) {
  await fetcher({
    method: 'DELETE',
    url,
    setAdminState,
    saveOperationResult,
    body: selectTableRowsIds
  });
}