import { EventsReducerActions } from 'admin/Events/eventsState';
import { useEventsDispatch, useSplitParams } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useProfile(eventsDispatch: Dispatch<EventsReducerActions>) {
  const location = useLocation();
  const { idParam } = useSplitParams();
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      eventsAction.CleanupProfile();
    };
  }, [eventsAction, location]);

  useEffect(() => {
    if (idParam === 'new') eventsAction.switchEditMode(true);
  }, [eventsAction, idParam]);
}
