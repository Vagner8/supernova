import {
  CopiesInputValues,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
} from 'admin/Events/eventsReducer';
import { Dispatch, useEffect } from 'react';

interface UseCopyInputValues {
  copyInputValues: EventsState['copyInputValues'];
  InputValues: CopiesInputValues | null;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useCopyInputValues({
  copyInputValues,
  InputValues,
  eventsDispatch,
}: UseCopyInputValues) {
  useEffect(() => {
    if (!copyInputValues) {
      eventsDispatch({
        type: EventsStrAction.CopyInputValues,
        payload: { copyInputValues: InputValues },
      });
    }
  }, [InputValues, copyInputValues, eventsDispatch]);
}
