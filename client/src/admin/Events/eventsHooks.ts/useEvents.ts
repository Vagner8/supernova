import { AdminReducerActions, useAdminDispatch } from 'admin/adminState';
import { newData } from 'api/newData';
import { deleteData } from 'api/deleteData';
import { updateData } from 'api/updateData';
import { useFirebaseStorage, useSplitPathname } from 'hooks';
import { Dispatch, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EventsReducerActions,
  EventsState,
  useEventsDispatch,
} from '../eventsState';
import { BaseType } from '../../../../../common/src/commonTypes';

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
  const { categoryParam } = useSplitPathname();
  const { saveOperationResult, setAdminState } =
    useAdminDispatch(adminDispatch);
  const eventsAction = useEventsDispatch(eventsDispatch);
  const navigate = useNavigate();
  const fireBase = useFirebaseStorage({ adminDispatch });
  return useMemo(() => {
    return {
      async newItem(profile: EventsState['profile']) {
        if (!profile) return;
        await newData({
          url: `/${categoryParam}/new/?itemId=${itemId}`,
          profile: profile,
          saveOperationResult,
          setAdminState,
        });
        navigate(`/admin/${categoryParam}/${profile.itemId}`);
      },

      async deleteItems(selectTableRowsIds: string[] | undefined) {
        await deleteData({
          url: `/${categoryParam}/delete/?itemId=${itemId}`,
          saveOperationResult,
          setAdminState,
          selectTableRowsIds,
        });
        navigate(`/admin/${categoryParam}`);
      },

      async updateItem(
        changedProfile: EventsState['changedProfile'],
        mediaFiles: EventsState['mediaFiles'],
      ) {
        let imgs: Partial<BaseType['imgs']> | undefined;
        if (mediaFiles.length && itemId) {
          imgs = await fireBase.download(mediaFiles, itemId);
        }
        await updateData({
          url: `/${categoryParam}/update/?itemId=${itemId}`,
          profile: { ...changedProfile, imgs },
          saveOperationResult,
          setAdminState,
        });
      },
    };
  }, [
    categoryParam,
    fireBase,
    itemId,
    navigate,
    saveOperationResult,
    setAdminState,
  ]);
}
