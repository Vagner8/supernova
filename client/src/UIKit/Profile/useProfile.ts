import { useSplitParams } from 'admin/Events/eventsHooks.ts/useSplitParams';
import { EventsReducerActions } from 'admin/Events/eventsReducer';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useProfile(eventsDispatch: Dispatch<EventsReducerActions>) {
  const location = useLocation();
  const { idParam } = useSplitParams();
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      eventsAction.cleanupPoints();
    };
  }, [eventsAction, location]);

  useEffect(() => {
    if (idParam === 'new') eventsAction.switchEditMode(true);
  }, [eventsAction, idParam]);
}
