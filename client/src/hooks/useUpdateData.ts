import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  showSaveEvent,
} from 'admin/Events/eventsReducer';
import { updateOwner } from 'api/updateOwner';
import { uploadFiles } from 'firebaseSender';
import { Dispatch, useEffect } from 'react';

interface UseUpdateData {
  selectedEvent: EventsState['selectedEvent'];
  changedPoints: EventsState['changedPoints'];
  files: EventsState['files'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useUpdateData({
  selectedEvent,
  changedPoints,
  files,
  adminDispatch,
  eventsDispatch,
}: UseUpdateData) {
  useEffect(() => {
    const asyncer = async () => {
      if (selectedEvent === EventNames.Save && changedPoints) {
        showSaveEvent(eventsDispatch, false);
        let imgUrl: string[] | undefined;
        if (files) {
          imgUrl = await uploadFiles({ files, adminDispatch });
        }
        if (imgUrl && changedPoints.personal) {
          changedPoints.personal.avatar = imgUrl[0];
        }
        await updateOwner({ adminDispatch, changedPoints });
      }
    };
    asyncer();
  }, [adminDispatch, eventsDispatch, files, changedPoints, selectedEvent]);
}
