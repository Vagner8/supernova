import { SaveOperationResult, SetIsFetching } from 'admin/adminState';
import { EventsState } from 'admin/Events/eventsState';
import { fetcher } from './fetcher';

interface UpdateData {
  url: string;
  profile: EventsState['changedProfile'];
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function updateData({
  profile,
  url,
  setIsFetching,
  saveOperationResult,
}: UpdateData) {
  await fetcher({
    body: profile,
    method: 'PUT',
    url,
    setIsFetching,
    saveOperationResult,
  });
}
