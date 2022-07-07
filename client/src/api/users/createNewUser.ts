import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsState';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch } from 'react';

export async function createNewUser(
  profile: EventsState['profile'],
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  await fetcher({
    body: profile,
    method: 'POST',
    url: `${GoTo.CreateUser}`,
    adminDispatch
  });
}
