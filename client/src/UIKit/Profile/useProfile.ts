import { EventsReducerActions } from 'admin/Events/eventsState';
import { useEventsDispatch, useSplitParams } from 'hooks';
import { Dispatch, useEffect } from 'react';

export function useProfile(eventsDispatch: Dispatch<EventsReducerActions>) {
  const { idParam } = useSplitParams();
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      eventsAction.cleanupProfile();
    };
  }, [eventsAction, idParam]);

  useEffect(() => {
    if (idParam === 'new') eventsAction.switchEditMode({ editMode: true });
  }, [eventsAction, idParam]);
}
