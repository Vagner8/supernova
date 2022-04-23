import { Dispatch, useEffect } from 'react';
import {
  UsersActionType,
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
    url: string,
  ): void;
}

export const useFetchUsers: UseFetchUsers = (
  usersDispatch,
  url,
) => {
  useEffect(() => {
    async function fetchData() {
      try {
        usersDispatch({
          type: UsersActionType.SetFetching,
          payload: { isFetching: true },
        });
        const responses = await fetch(url);
        const json = await responses.json();
        usersDispatch({
          type: UsersActionType.SetData,
          payload: { users: json },
        });
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
  }, [usersDispatch, url]);
};
