import {
  EventsReducerActions,
  useEventsDispatch,
} from 'admin/Events/eventsState';
import { Dispatch, useEffect } from 'react';

export function useTable(eventsDispatch: Dispatch<EventsReducerActions>) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    return () =>
      eventsAction.setEventsState({
        tableRows: null,
      });
  }, [eventsAction]);
}
