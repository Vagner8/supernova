import {
  EventsReducerActions,
  EventsState,
  savePopup,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

export function useWindowClick(eventsDispatch: Dispatch<EventsReducerActions>) {
  useEffect(() => {
    function onClick(this: Window, e: MouseEvent) {
      managePopups(e.target, eventsDispatch);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [eventsDispatch]);
}

const managePopups = (
  target: EventTarget | null,
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  if (target) {
    const closestElement = (target as HTMLElement).closest('[data-popup]');
    if (closestElement) {
      const popup = closestElement.getAttribute(
        'data-popup',
      ) as EventsState['popup'];
      return savePopup(eventsDispatch, popup);
    }
  }
  savePopup(eventsDispatch, null);
};
