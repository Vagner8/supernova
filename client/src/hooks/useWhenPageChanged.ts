import { EventsReducerActions } from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventsDispatch } from './useEventsDispatch';

export function useWhenPageChanged(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  const location = useLocation();
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () => {
      console.log('eventsAction.cleanupPoint');
      eventsAction.cleanupPoints();
    };
  }, [eventsAction, location]);
}
