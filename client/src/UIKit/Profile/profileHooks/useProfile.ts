import {
  EventsReducerActions,
  useEventsDispatch,
} from 'admin/Events/eventsState';
import { useSplitParams } from 'hooks';
import { Dispatch, useEffect } from 'react';

export function useProfile(eventsDispatch: Dispatch<EventsReducerActions>) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const { itemId } = useSplitParams();
  useEffect(() => {
    if (itemId === 'new') eventsAction.setEventsState({ editMode: true });
    return () => {
      eventsAction.setEventsState({
        profile: null,
        copyProfile: null,
        changedProfile: {},
        mediaFiles: [],
        editMode: false,
      });
    };
  }, [eventsAction, itemId]);
}
