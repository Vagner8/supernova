import { EventsReducerActions } from 'admin/Events/eventsState';
import { useEventsDispatch, useSplitParams } from 'hooks';
import { Dispatch, useEffect } from 'react';

export function useProfile(eventsDispatch: Dispatch<EventsReducerActions>) {
  const { itemId } = useSplitParams();
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      eventsAction.cleanupProfile();
    };
  }, [eventsAction, itemId]);

  useEffect(() => {
    if (itemId === 'new') eventsAction.switchEditMode({ editMode: true });
  }, [eventsAction, itemId]);
}
