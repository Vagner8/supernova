import {
  EventsReducerActions,
  EventsState,
  SavePopup,
} from 'admin/Events/eventsState';
import { Dispatch, useEffect } from 'react';
import { useEventsDispatch } from './useEventsDispatch';

interface UseWindowClick {
  popup: EventsState['popup'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useWindowClick({ eventsDispatch, popup }: UseWindowClick) {
  const { savePopup } = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    function onClick(this: Window, e: MouseEvent) {
      managePopups(e.target, popup, savePopup);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [popup, savePopup]);
}

const managePopups = (
  target: EventTarget | null,
  popup: EventsState['popup'],
  savePopup: (popup: SavePopup['payload']) => void,
) => {
  if (target) {
    const closestElement = (target as HTMLElement).closest('[data-popup]');
    if (closestElement) {
      const dataPopup = closestElement.getAttribute(
        'data-popup',
      ) as EventsState['popup'];
      return savePopup({ popup: dataPopup });
    }
  }
  if (popup) savePopup({ popup: null });
};
