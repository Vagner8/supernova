import { SaveOperationResult, SetAdminState } from 'admin/adminState';
import { AllPartial, ProfileType } from 'admin/Events/eventsState';
import { fetcher } from './fetcher';

interface UpdateData {
  url: string;
  profile: AllPartial<ProfileType> ;
  setAdminState: ({ isFetching }: SetAdminState['payload']) => void;
  saveOperationResult: ({
    operationResult,
  }: SaveOperationResult['payload']) => void;
}

export async function updateData({
  profile,
  url,
  setAdminState,
  saveOperationResult,
}: UpdateData) {
  await fetcher({
    body: profile,
    method: 'PUT',
    url,
    setAdminState,
    saveOperationResult,
  });
}
