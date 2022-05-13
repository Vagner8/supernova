import { Dispatch, useEffect, useMemo } from 'react';
import {
  UsersActionType,
  UsersForTable,
  UsersReducerActions,
} from '../admin/Users/usersState/usersTypes';

export enum FetchStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Error = 'error',
}

export enum UsersAPI {
  Users = '/users',
  Profile = '/users/profile',
  DeleteUser = '/users/delete',
  PostUser = '/users/post',
  Settings = '/settings',
}

interface UseFetchUsers {
  (
    usersDispatch: Dispatch<UsersReducerActions>,
    action: string,
    url: string,
  ): void;
}

export const useFetchUsers: UseFetchUsers = (usersDispatch, action, url) => {
  type DispatchDataKeys = keyof typeof dispatchData
  const dispatchData = useMemo(() => {
    return {
      SetUsersForTable: (data: UsersForTable[]) =>
        usersDispatch({
          type: UsersActionType.SetUsersForTable,
          payload: { usersForTable: data },
        }),
    };
  }, [usersDispatch])
  
  useEffect(() => {
    async function fetchData() {
      try {
        usersDispatch({
          type: UsersActionType.SetFetching,
          payload: { isFetching: true },
        });
        const responses = await fetch(url);
        const json = await responses.json();
        dispatchData[action as DispatchDataKeys](json);
        usersDispatch({
          type: UsersActionType.SetFetching,
          payload: { isFetching: false },
        });
      } catch ({ message }) {
        usersDispatch({
          type: UsersActionType.SetError,
          payload: { isError: new Error(message as string) },
        });
      }
    }
    fetchData();
  }, [usersDispatch, action, url, dispatchData]);
};
