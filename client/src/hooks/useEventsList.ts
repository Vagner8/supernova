import { useEventsDispatch, useLocalStorageData, useSplitParams } from 'hooks';
import { Dispatch, useEffect } from 'react';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsState';

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
  const { itemId } = useSplitParams();
  const adminId = useLocalStorageData('adminId');
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEffect(() => {
    const editEvent = () => (editMode ? EventNames.EditOff : EventNames.Edit);
    const copyEvent = () => {
      if (!isSomeRowSelected) return '';
      return EventNames.Copy;
    };
    const deleteEvent = () => {
      if (itemId && itemId !== adminId) return EventNames.Delete;
      // if (!isSomeRowSelected) return '';
      if (itemId === adminId) return '';
      return EventNames.Delete;
    };
    const saveEvent = () => (editMode ? EventNames.Save : '');

    eventsAction.saveEventsList({
      newEventsList: [
        EventNames.New,
        editEvent(),
        copyEvent(),
        deleteEvent(),
        saveEvent(),
      ],
    });
  }, [editMode, itemId, adminId, eventsAction, isSomeRowSelected]);
}
