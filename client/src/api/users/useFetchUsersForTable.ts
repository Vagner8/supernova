import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions } from 'admin/Events/eventsState';
import { Projection } from 'admin/UserProfile/useUserProfile';
import { GoTo, fetcher } from 'api/fetcher';
import { useAdminDispatch, useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export interface UseFetchUsersForTableResponse {
  _id: string;
  userId: UserType['userId'];
  name: UserType['personal']['name'];
  surname: UserType['personal']['surname'];
  email: UserType['contacts']['email'];
  phone: UserType['contacts']['phone'];
  rule: UserType['settings']['rule'];
  avatar: UserType['imgs']['avatar'];
  selected?: UserType['selected'];
}

const projection: Omit<Projection<UseFetchUsersForTableResponse>, '_id'> = {
  userId: '$userId',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$settings.rule',
  avatar: '$imgs.avatar',
};

export function useFetchUsersForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch)
  useEffect(() => {
    const asyncer = async () => {
      const tableRows = await fetcher<UseFetchUsersForTableResponse[]>({
        method: 'GET',
        url: `${GoTo.UserAggregate}/?projection=${JSON.stringify(projection)}`,
        saveOperationResult: adminAction.saveOperationResult,
        setIsFetching: adminAction.setIsFetching,
      });
      if (!tableRows) return;
      eventsAction.saveUsers({ tableRows });
    };
    asyncer();
  }, [eventsAction, adminAction]);
}
