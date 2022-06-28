import { AdminReducerActions } from 'admin/adminReducer';
import { EventsReducerActions, saveUsers } from 'admin/Events/eventsReducer';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { UserProject, UserType } from '../../../../common/src/userTypes';

const projection: UserProject = {
  userId: '$userid',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$credentials.rule',
};

export interface UseFetchUsersForTableResponse {
  _id: UserType['userId'];
  name: UserType['personal']['name'];
  surname: UserType['personal']['surname'];
  email: UserType['contacts']['email'];
  phone: UserType['contacts']['phone'];
  rule: UserType['credentials']['rule'];
}

export function useFetchUsersForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = (await fetcher<UseFetchUsersForTableResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}/?projection=${JSON.stringify(projection)}`,
        adminDispatch,
      }));
      if (!response) return;
      saveUsers(eventsDispatch, response);
    };
    asyncer();
  }, [eventsDispatch, adminDispatch]);
}
