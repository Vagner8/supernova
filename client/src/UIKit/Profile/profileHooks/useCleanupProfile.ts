import { EventsReducerActions } from 'admin/Events/eventsState';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';

export function useCleanupProfile(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      eventsAction.cleanupProfile();
    };
  }, [eventsAction]);
}
