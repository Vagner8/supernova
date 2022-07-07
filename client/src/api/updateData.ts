import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsState';
import { Dispatch } from 'react';
import { fetcher } from './fetcher';

interface UpdateData {
  adminDispatch: Dispatch<AdminReducerActions>;
  url: string;
  profile: EventsState['changedProfile'];
}

export async function updateData({
  adminDispatch,
  profile,
  url,
}: UpdateData) {
  await fetcher({
    body: profile,
    method: 'PUT',
    url,
    adminDispatch
  });
}
