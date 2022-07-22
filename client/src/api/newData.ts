import { SaveOperationResult, SetAdminState } from 'admin/adminState';
import { AllPartial, ProfileType } from 'admin/Events/eventsState';
import { fetcher } from './fetcher';

interface NewData {
  url: string;
  profile: AllPartial<ProfileType> ;
  setAdminState: ({ isFetching }: SetAdminState['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function newData({
  profile,
  url,
  setAdminState,
  saveOperationResult,
}: NewData) {
  await fetcher({
    body: profile,
    method: 'POST',
    url,
    setAdminState,
    saveOperationResult,
  });
}
