import { Dispatch, useEffect } from 'react';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  useEventsDispatch,
} from 'admin/Events/eventsState';
import { useSplitPathname, useLocalStorage } from 'hooks';

interface UseEventsList {
  editMode: EventsState['editMode'];
  isSomeRowSelected: boolean | undefined;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEventsList({
  editMode,
  isSomeRowSelected,
  eventsDispatch,
}: UseEventsList) {
  const { itemId } = useSplitPathname();
  const adminId = useLocalStorage('adminId');
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    const editEvent = () => (editMode ? EventNames.EditOff : EventNames.Edit);
    const copyEvent = () => {
      if (!isSomeRowSelected) return '';
      return EventNames.Copy;
    };
    const deleteEvent = () => {
      if (itemId) {
        if (itemId === adminId) return '';
        if (itemId === 'new') return '';
      }
      if (!itemId) {
        if (!isSomeRowSelected) return '';
      }
      return EventNames.Delete;
    };
    const saveEvent = () => (editMode ? EventNames.Save : '');

    eventsAction.setEventsState({
      eventsList: [
        EventNames.New,
        editEvent(),
        copyEvent(),
        deleteEvent(),
        saveEvent(),
      ],
    });
  }, [adminId, editMode, eventsAction, isSomeRowSelected, itemId]);
}
