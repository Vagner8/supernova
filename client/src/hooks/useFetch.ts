import { useEffect, useState } from 'react';

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

export function useFetch(url: string) {
  const [data, setData] = useState<unknown>();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    async function fetchData() {
      setStatus(FetchStatus.Pending);
      try {
        const responses = await fetch(url);
        const json = await responses.json();
        setData(json);
        setStatus(FetchStatus.Fulfilled);
      } catch (err) {
        setStatus(FetchStatus.Error);
      }
    }
    fetchData();
  }, [url]);

  return {
    data,
    status,
  };
}
