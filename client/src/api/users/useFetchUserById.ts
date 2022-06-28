import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventsReducerActions,
  savePoints,
} from 'admin/Events/eventsReducer';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';


export interface UseFetchUserByIdResponse {
  personal: UserType['personal'];
  contacts: UserType['contacts'];
  address: UserType['address'];
  imgs: {
    avatar: UserType['imgs']['avatar']
  },
  credentials: {
    login: UserType['credentials']['login'],
    rule: UserType['credentials']['rule'],
  },
}

export function useFetchUserById(
  userId: string | undefined,
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = (await fetcher<UseFetchUserByIdResponse>({
        method: 'GET',
        url: `${GoTo.GetUsers}/&userId=${userId}`,
        adminDispatch,
      }));
      if (!response) return;
      savePoints(eventsDispatch, response);
    };
    asyncer();
  }, [eventsDispatch, adminDispatch, userId]);
}
