import { SaveOperationResult, SetIsFetching } from 'admin/adminState';
import { AllPartial, ProfileType } from 'admin/Events/eventsState';
import { fetcher } from './fetcher';

interface NewData {
  url: string;
  profile: AllPartial<ProfileType> ;
  setIsFetching: ({ isFetching }: SetIsFetching['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function newData({
  profile,
  url,
  setIsFetching,
  saveOperationResult,
}: NewData) {
  await fetcher({
    body: profile,
    method: 'POST',
    url,
    setIsFetching,
    saveOperationResult,
  });
}
