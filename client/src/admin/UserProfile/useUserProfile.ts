import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions } from 'admin/Events/eventsState';
import { GoTo, fetcher } from 'api/fetcher';
import { useAdminDispatch, useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export type Projection<T> = {
  [K in keyof T]: Projection<T[K]> | string;
};

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// export type UserProfileResponse = Optional<
//   Omit<UserType, 'refreshToken' | 'selected'>,
//   'secret'
// >;

export type UserProfileResponse = Omit<UserType, 'refreshToken' | 'selected'>

const projection: Omit<Projection<UserProfileResponse>, '_id' | 'secret'> = {
  userId: '$userId',
  created: '$created',
  personal: '$personal',
  contacts: '$contacts',
  address: '$address',
  settings: '$settings',
  imgs: '$imgs',
};

interface UseUserProfile {
  userId: string | undefined;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function useUserProfile({
  userId,
  eventsDispatch,
  adminDispatch,
}: UseUserProfile) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  useEffect(() => {
    const asyncer = async () => {
      const profile = await fetcher<UserProfileResponse[]>({
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
