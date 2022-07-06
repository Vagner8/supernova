import { AdminReducerActions } from 'admin/adminReducer';
import { EventsReducerActions } from 'admin/Events/eventsState';
import { GoTo, fetcher } from 'api/fetcher';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';
import { Projection } from './useFetchUserById';

export interface UseFetchUsersForTableResponse {
  _id: string;
  userId: UserType['userId'];
  name: UserType['personal']['name'];
  surname: UserType['personal']['surname'];
  email: UserType['contacts']['email'];
  phone: UserType['contacts']['phone'];
  rule: UserType['credentials']['rule'];
  avatar: UserType['imgs']['avatar'];
  selected?: UserType['selected']
}

const projection: Omit<Projection<UseFetchUsersForTableResponse>, '_id'> = {
  userId: '$userId',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$credentials.rule',
  avatar: '$imgs.avatar',
};

export function useFetchUsersForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch)
  useEffect(() => {
    const asyncer = async () => {
      const response = await fetcher<UseFetchUsersForTableResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}/?projection=${JSON.stringify(projection)}`,
        adminDispatch,
      });
      if (!response) return;
      eventsAction.saveUsers(response);
    };
    asyncer();
  }, [adminDispatch, eventsAction]);
}
