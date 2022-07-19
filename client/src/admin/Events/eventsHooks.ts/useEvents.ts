import { AdminReducerActions } from 'admin/adminState';
import { newData } from 'api/newData';
import { deleteData } from 'api/deleteData';
import { updateData } from 'api/updateData';
import {
  useAdminDispatch,
  useEventsDispatch,
  useFirebaseStorage,
  useSplitParams,
} from 'hooks';
import { Dispatch, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventsReducerActions, EventsState } from '../eventsState';

interface UseEvents {
  itemId?: string;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEvents({
  itemId,
  adminDispatch,
  eventsDispatch,
}: UseEvents) {
  const { categoryParam } = useSplitParams();
  const { saveOperationResult, setIsFetching } =
    useAdminDispatch(adminDispatch);
  const eventsAction = useEventsDispatch(eventsDispatch);
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      async newItem(profile: EventsState['profile']) {
        if (!profile) return;
        await newData({
          url: `/${categoryParam}/new/?itemId=${itemId}`,
          profile: profile,
          saveOperationResult,
          setIsFetching,
        });
        navigate(`/admin/${categoryParam}/${profile.itemId}`);
      },

      async deleteItems(selectTableRowsIds: string[] | undefined) {
        await deleteData({
          url: `/${categoryParam}/delete/?itemId=${itemId}`,
          saveOperationResult,
          setIsFetching,
          selectTableRowsIds,
        });
        navigate(`/admin/${categoryParam}`);
      },

      async updateItem(changedProfile: EventsState['changedProfile']) {
        eventsAction.switchEditMode({ editMode: false });
        await updateData({
          url: `/${categoryParam}/update/?itemId=${itemId}`,
          profile: changedProfile,
          saveOperationResult,
          setIsFetching,
        });
      },
    };
  }, [
    categoryParam,
    eventsAction,
    itemId,
    navigate,
    saveOperationResult,
    setIsFetching,
  ]);
}
