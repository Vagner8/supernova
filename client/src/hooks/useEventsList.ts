import {
  EventsReducerActions,
  EventsState,
  saveEventsList,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

interface UseEventsList {
  eventsList: EventsState['eventsList'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEventsList({
  eventsDispatch,
  eventsList,
}: UseEventsList) {
  useEffect(() => {
    saveEventsList(eventsDispatch, eventsList);
  }, [eventsDispatch, eventsList]);
}
