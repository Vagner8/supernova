import { AdminReducerActions, AdminStrAction } from "admin/adminReducer";
import { Dispatch, useEffect } from "react";
import { fetcher } from "./fetcher";

interface UseFetchProps {
  url: string,
  adminDispatch: Dispatch<AdminReducerActions>
}

export function useFetch<D>({url, adminDispatch}: UseFetchProps) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher<D>('GET', url, adminDispatch);
      if (!response || 'logout' in response) {
        return adminDispatch({
          type: AdminStrAction.SaveError,
          payload: response,
        });
      }
      adminDispatch({ type: AdminStrAction.SaveOwner, payload: response });
      adminDispatch({
        type: AdminStrAction.SaveLoading,
        payload: { type: 'ok', message: 'Success data is uploaded' },
      });
    };
    fetchData();
  }, [adminDispatch]);
}