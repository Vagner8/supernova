import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventsReducerActions,
  saveCopyOfPoints,
  savePoints,
} from 'admin/Events/eventsReducer';
import { AddressTo, fetcher } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { Projection } from '../../../../common/src/commonTypes';
import { UserType } from '../../../../common/src/userTypes';

const projection: Projection<UserType> = {
  _id: 0,
  personal: 1,
  contacts: 1,
  address: 1,
  imgs: 1,
  configs: {
    login: 1,
    rule: 1,
  },
};

export interface UseFetchUserByIdResponse {
  personal: UserType['personal'];
  contacts: UserType['contacts'];
  address: UserType['address'];
  imgs: UserType['imgs'];
  configs: {
    login: UserType['configs']['login'];
    rule: UserType['configs']['rule'];
  };
}

export function useFetchUserById(
  userId: string | undefined,
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = (await fetcher({
        method: 'GET',
        url: `${AddressTo.GetUsers}/?projection=${
          userId === 'new' ? null : JSON.stringify(projection)
        }&userId=${userId}`,
        adminDispatch,
        message: 'received data',
      })) as UseFetchUserByIdResponse | null;
      if (!response) return;
      savePoints(eventsDispatch, response);
      saveCopyOfPoints(eventsDispatch);
    };
    asyncer();
  }, [eventsDispatch, adminDispatch, userId]);
}
