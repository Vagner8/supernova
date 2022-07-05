import { AdminReducerActions } from 'admin/adminReducer';
import { EventsReducerActions } from 'admin/Events/eventsReducer';
import { GoTo, fetcher } from 'api/fetcher';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export interface UseFetchUserByIdResponse {
  _id: string;
  personal: UserType['personal'];
  contacts: UserType['contacts'];
  address: UserType['address'];
  imgs: {
    avatar: UserType['imgs']['avatar'];
  };
  credentials: {
    login: UserType['credentials']['login'];
    rule: UserType['credentials']['rule'];
  };
}

export type Projection<T> = {
  [K in keyof T]: Projection<T[K]> | string;
};


const projection: Omit<Projection<UseFetchUserByIdResponse>, '_id'> = {
  personal: '$personal',
  contacts: '$contacts',
  address: '$address',
  imgs: {
    avatar: '$imgs.avatar',
  },
  credentials: {
    login: '$credentials.login',
    rule: '$credentials.rule',
  },
};

export function useFetchUserById(
  userId: string | undefined,
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch)
  useEffect(() => {
    const asyncer = async () => {
      const response = await fetcher<UseFetchUserByIdResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}/?projection=${JSON.stringify(
          projection,
        )}&userId=${userId}`,
        adminDispatch,
      });
      if (!response) return;
      eventsAction.savePoints(response[0]);
    };
    asyncer();
  }, [adminDispatch, eventsAction, userId]);
}
