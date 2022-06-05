import {
  CopiesInputValues,
  EventNames,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
} from 'admin/Events/eventsReducer';
import {
  ProfileReducerActions,
  ProfileStrAction,
} from 'admin/Profile/profileReducer';
import { Dispatch, useEffect } from 'react';

interface UseCopyInputValues {
  copyInputValues: EventsState['copyInputValues'];
  inputValues: CopiesInputValues | null;
  selectedEvent: EventsState['selectedEvent'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  profileDispatch: Dispatch<ProfileReducerActions>;
}

export function useCopyInputValues({
  copyInputValues,
  inputValues,
  selectedEvent,
  eventsDispatch,
  profileDispatch,
}: UseCopyInputValues) {
  useEffect(() => {
    if (!copyInputValues) {
      eventsDispatch({
        type: EventsStrAction.CopyInputValues,
        payload: { copyInputValues: inputValues },
      });
    }
    if (selectedEvent === EventNames.EditOff && copyInputValues) {
      profileDispatch({
        type: ProfileStrAction.SaveOwnerPII,
        payload: {
          ownerPII: copyInputValues,
        },
      });
    }
  }, [
    inputValues,
    copyInputValues,
    eventsDispatch,
    profileDispatch,
    selectedEvent,
  ]);
}
