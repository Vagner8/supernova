import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
  showSaveEvent,
} from 'admin/Events/eventsReducer';
import { ProfileState } from 'admin/Profile/profileReducer';
import { updateOwner } from 'api/updateOwner';
import { uploadFiles } from 'firebaseSender';
import { Dispatch, useEffect } from 'react';

interface UseUpdateData {
  selectedEvent: EventsState['selectedEvent'];
  data: ProfileState['ownerPII'];
  files: EventsState['files'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useUpdateData({
  selectedEvent,
  data,
  files,
  adminDispatch,
  eventsDispatch,
}: UseUpdateData) {
  useEffect(() => {
    const asyncer = async () => {
      if (selectedEvent === EventNames.Save && data) {
        showSaveEvent(eventsDispatch, false)
        const imgUrl = await uploadFiles({files, adminDispatch});
        // profileState.ownerPII.personal.avatar = imgUrl[0]
        await updateOwner({ adminDispatch, ownerPII: data });
      }
    };
    asyncer();
  }, [adminDispatch, eventsDispatch, files, data, selectedEvent]);
}
