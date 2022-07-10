import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions } from 'admin/Events/eventsState';
import { GoTo, fetcher } from 'api/fetcher';
import { useAdminDispatch, useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export interface UseFetchToGetUserProfileResponse {
  _id: string;
  userId: UserType['userId'];
  created: UserType['created'];
  personal: UserType['personal'];
  contacts: UserType['contacts'];
  address: UserType['address'];
  settings: UserType['settings'];
  imgs: UserType['imgs'];
  secret?: UserType['secret'];
}

export type Projection<T> = {
  [K in keyof T]: Projection<T[K]> | string;
};

const projection: Omit<Projection<UseFetchToGetUserProfileResponse>, '_id'> = {
  userId: '$userId',
  created: '$created',
  personal: '$personal',
  contacts: '$contacts',
  address: '$address',
  settings: '$settings',
  imgs: '$imgs',
};

export function useFetchToGetUserProfile(
  userId: string | undefined,
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  useEffect(() => {
    const asyncer = async () => {
      const profile = await fetcher<UseFetchToGetUserProfileResponse[]>({
        method: 'GET',
        url: `${GoTo.UserAggregate}/?projection=${JSON.stringify(
          projection,
        )}&userId=${userId}`,
        saveOperationResult: adminAction.saveOperationResult,
        setIsFetching: adminAction.setIsFetching,
      });
      if (!profile) return;
      eventsAction.savePoints({ profile: profile[0] });
    };
    asyncer();
  }, [adminAction, eventsAction, userId]);
}
