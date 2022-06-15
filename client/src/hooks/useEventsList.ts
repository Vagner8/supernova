import {
  EventsReducerActions,
  EventsState,
  saveEventsList,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

interface UseEventsList {
  newEventsList: EventsState['eventsList'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEventsList({
  newEventsList,
  eventsDispatch,
}: UseEventsList) {
  useEffect(() => {
    saveEventsList(eventsDispatch, newEventsList)
  }, [eventsDispatch, newEventsList]);
}
