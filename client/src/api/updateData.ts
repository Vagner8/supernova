import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { fetcher } from './fetcher';

interface UpdateData {
  adminDispatch: Dispatch<AdminReducerActions>;
  url: string;
  points: EventsState['changedPoints'];
}

export async function updateData({
  adminDispatch,
  points,
  url,
}: UpdateData) {
  await fetcher({
    body: points,
    method: 'PUT',
    url,
    adminDispatch
  });
}
