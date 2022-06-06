import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  showSaveEvent,
} from 'admin/Events/eventsReducer';
import { ProfileState } from 'admin/Profile/profileReducer';
import { updateOwner } from 'api/updateOwner';
import { uploadFiles } from 'firebaseSender';
import { Dispatch, useEffect } from 'react';

interface UseUpdateData {
  selectedEvent: EventsState['selectedEvent'];
  ownerPII: ProfileState['ownerPII'];
  files: EventsState['files'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useUpdateData({
  selectedEvent,
  ownerPII,
  files,
  adminDispatch,
  eventsDispatch,
}: UseUpdateData) {
  useEffect(() => {
    const asyncer = async () => {
      if (selectedEvent === EventNames.Save && ownerPII) {
        showSaveEvent(eventsDispatch, false);
        let imgUrl: string[] | undefined
        if (files) {
          imgUrl = await uploadFiles({ files, adminDispatch });
        }
        if (imgUrl) {
          ownerPII.personal.avatar = imgUrl[0]
        }
        await updateOwner({ adminDispatch, ownerPII });
      }
    };
    asyncer();
  }, [adminDispatch, eventsDispatch, files, ownerPII, selectedEvent]);
}
