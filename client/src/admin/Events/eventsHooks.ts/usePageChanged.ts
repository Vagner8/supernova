import { Dispatch, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventsReducerActions, switchEditMode } from '../eventsReducer';

interface UsePageChanged {
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function usePageChanged({ eventsDispatch }: UsePageChanged) {
  const params = useParams();
  useEffect(() => {
    if (!params['*']) return;
    if (params['*'].match(/new/i)) {
      switchEditMode(eventsDispatch, true);
      return;
    }
    switchEditMode(eventsDispatch, false);
  }, [eventsDispatch, params]);
}
