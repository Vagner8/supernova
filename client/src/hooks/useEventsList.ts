import {
  EventsReducerActions,
  EventsState,
  saveEventsList,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

interface UseEventsList {
  eventsList: EventsState['eventsList'];
  isEventsListExist: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEventsList({
  eventsDispatch,
  eventsList,
  isEventsListExist,
}: UseEventsList) {
  useEffect(() => {
    if (!isEventsListExist) {
      saveEventsList(eventsDispatch, eventsList);
    }
  }, [eventsDispatch, eventsList, isEventsListExist]);
}
