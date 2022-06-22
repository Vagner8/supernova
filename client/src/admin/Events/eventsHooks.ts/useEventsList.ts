import { useLocalStorageData } from 'hooks';
import { Dispatch, useEffect } from 'react';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  saveEventsList,
} from '../eventsReducer';
import { useSplitParams } from './useSplitParams';

interface UseEventsList {
  editMode: EventsState['editMode'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function useEventsList({
  editMode,
  eventsDispatch,
}: UseEventsList) {
  const { paramsName, paramsId } = useSplitParams();
  const adminId = useLocalStorageData('adminId')
  useEffect(() => {
    const editEvent = () => (editMode ? EventNames.EditOff : EventNames.Edit);
    const copyEvent = () => (paramsId === adminId ? '' : EventNames.Copy);
    const deleteEvent = () => (paramsId === adminId ? '' : EventNames.Delete);
    const saveEvent = () => (editMode ? EventNames.Save : '');

    saveEventsList(eventsDispatch, [
      EventNames.New,
      editEvent(),
      copyEvent(),
      deleteEvent(),
      saveEvent(),
    ]);
  }, [eventsDispatch, editMode, paramsId, adminId]);
}