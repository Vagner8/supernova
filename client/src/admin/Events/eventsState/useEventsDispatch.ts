import {
  EventsStrAction,
  EventsReducerActions,
  SelectTableRow,
  ProfileOnChange,
  SaveMediaFiles,
  DeleteOneMediaFile,
  SwitchSwitch,
  SetEventsState,
} from 'admin/Events/eventsState';
import { Dispatch, useMemo } from 'react';

export function useEventsDispatch(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  return useMemo(() => {
    return {
      switchSwitch({ itemId }: SwitchSwitch['payload']) {
        eventsDispatch({
          type: EventsStrAction.SwitchSwitch,
          payload: { itemId },
        });
      },

      setEventsState(changes: SetEventsState['payload']) {
        eventsDispatch({
          type: EventsStrAction.SetEventsState,
          payload: changes
        });
      },

      profileOnChange({ name, value, pointName }: ProfileOnChange['payload']) {
        eventsDispatch({
          type: EventsStrAction.ProfileOnChange,
          payload: { name, value, pointName },
        });
      },

      saveMediaFiles({
        files,
        name,
      }: SaveMediaFiles['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveMediaFiles,
          payload: { files, name },
        });
      },

      deleteOneMediaFile({ name }: DeleteOneMediaFile['payload']) {
        eventsDispatch({
          type: EventsStrAction.DeleteOneMediaFile,
          payload: { name },
        });
      },

      restoreProfile() {
        eventsDispatch({ type: EventsStrAction.RestoreProfile });
      },

      selectTableRow({ itemId }: SelectTableRow['payload']) {
        eventsDispatch({
          type: EventsStrAction.SelectTableRow,
          payload: { itemId },
        });
      },
    };
  }, [eventsDispatch]);
}
