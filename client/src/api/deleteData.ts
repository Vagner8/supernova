import { SaveOperationResult, SetIsFetching } from 'admin/adminState';
import { EventsState } from 'admin/Events/eventsState';
import { fetcher } from './fetcher';

interface DeleteData {
  url: string;
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
  selectedTableRows?: EventsState['tableRows']
}

export async function deleteData({
  url,
  setIsFetching,
  saveOperationResult,
  selectedTableRows,
}: DeleteData) {
  await fetcher({
    method: 'DELETE',
    url,
    setIsFetching,
    saveOperationResult,
    body: selectedTableRows
  });
}