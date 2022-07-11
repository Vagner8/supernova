import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions } from 'admin/Events/eventsState';
import { Projection } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { GoTo, fetcher } from 'api/fetcher';
import { useAdminDispatch, useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../../common/src/userTypes';

export interface UserForTableResponse {
  _id: string;
  itemId: UserType['itemId'];
  name: UserType['personal']['name'];
  surname: UserType['personal']['surname'];
  email: UserType['contacts']['email'];
  phone: UserType['contacts']['phone'];
  rule: UserType['settings']['rule'];
  avatar: UserType['imgs']['avatar'];
  selected?: UserType['selected'];
}

const projection: Omit<Projection<UserForTableResponse>, '_id'> = {
  itemId: '$itemId',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$settings.rule',
  avatar: '$imgs.avatar',
};

export function useFetchToGetUsersForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch)
  useEffect(() => {
    const asyncer = async () => {
      const tableRows = await fetcher<UserForTableResponse[]>({
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
