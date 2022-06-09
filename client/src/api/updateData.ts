import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { fetcher } from './fetcher';

interface UpdateData {
  adminDispatch: Dispatch<AdminReducerActions>;
  params: string | undefined;
  changedPoints: EventsState['changedPoints'];
}

export async function updateData({
  adminDispatch,
  changedPoints,
  params,
}: UpdateData) {
  await fetcher({
    body: changedPoints,
    method: 'PUT',
    url: `/${params}/update`,
    adminDispatch,
    message: 'successful update'
  });
}
