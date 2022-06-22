import {
  EventsReducerActions,
  EventsState,
  savePopup,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

interface UseWindowClick {
  popup: EventsState['popup']
  eventsDispatch: Dispatch<EventsReducerActions>
}

export function useWindowClick({eventsDispatch, popup}: UseWindowClick) {
  useEffect(() => {
    function onClick(this: Window, e: MouseEvent) {
      managePopups(e.target, popup, eventsDispatch);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [popup, eventsDispatch]);
}

const managePopups = (
  target: EventTarget | null,
  popup: EventsState['popup'],
  eventsDispatch: Dispatch<EventsReducerActions>,
) => {
  if (target) {
    const closestElement = (target as HTMLElement).closest('[data-popup]');
    if (closestElement) {
      const dataPopup = closestElement.getAttribute(
        'data-popup',
      ) as EventsState['popup'];
      return savePopup(eventsDispatch, dataPopup);
    }
  }
  if (popup) savePopup(eventsDispatch, null);
};
