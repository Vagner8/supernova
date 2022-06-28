import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch } from 'react';

export async function createNewUser(
  points: EventsState['points'],
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  await fetcher({
    body: points,
    method: 'POST',
    url: `${GoTo.CreateUser}`,
    adminDispatch
  });
}
