import {
  EventsReducerActions,
  EventsState,
  SetEventsState,
} from 'admin/Events/eventsState';
import { Dispatch, useEffect } from 'react';
import { useEventsDispatch } from '../admin/Events/eventsState/useEventsDispatch';

interface UseWindowClick {
  popup: EventsState['popup'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useWindowClick({ eventsDispatch, popup }: UseWindowClick) {
  const { setEventsState } = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    function onClick(this: Window, e: MouseEvent) {
      managePopups(e.target, popup, setEventsState);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [popup, setEventsState]);
}

const managePopups = (
  target: EventTarget | null,
  popup: EventsState['popup'],
  setEventsState: (included: SetEventsState['payload']) => void,
) => {
  if (target) {
    const closestElement = (target as HTMLElement).closest('[data-popup]');
    if (closestElement) {
      const dataPopup = closestElement.getAttribute(
        'data-popup',
      ) as EventsState['popup'];
      return setEventsState({ popup: dataPopup });
    }
  }
  if (popup) setEventsState({ popup: null });
};
