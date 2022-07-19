import {
  EventsStrAction,
  EventsReducerActions,
  SaveImgs,
  SelectTableRow,
  SaveTableRows,
  ProfileOnChange,
  SaveEventsList,
  SaveProfile,
  SavePopup,
  SaveMediaFiles,
  DeleteOneMediaFile,
  SwitchEditMode,
  SwitchSwitch,
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

      cleanupProfile() {
        eventsDispatch({
          type: EventsStrAction.CleanupProfile,
        });
      },

      savePopup({ popup }: SavePopup['payload']) {
        eventsDispatch({
          type: EventsStrAction.SavePopup,
          payload: { popup },
        });
      },

      savePoints({ profile }: SaveProfile['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveProfile,
          payload: { profile },
        });
      },

      saveProfileCopy() {
        eventsDispatch({ type: EventsStrAction.SaveProfileCopy });
      },

      profileOnChange({ name, value, pointName }: ProfileOnChange['payload']) {
        eventsDispatch({
          type: EventsStrAction.ProfileOnChange,
          payload: { name, value, pointName },
        });
      },

      saveEventsList({ newEventsList }: SaveEventsList['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveEventsList,
          payload: { newEventsList },
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

      deleteAllFiles() {
        eventsDispatch({
          type: EventsStrAction.DeleteAllFiles,
        });
      },

      switchEditMode({ editMode }: SwitchEditMode['payload']) {
        eventsDispatch({
          type: EventsStrAction.SwitchEditMode,
          payload: { editMode },
        });
      },

      saveUsers({ tableRows }: SaveTableRows['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveTableRows,
          payload: { tableRows },
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

      saveImgs({ firebaseUrls, fileInputName }: SaveImgs['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveImgs,
          payload: { firebaseUrls, fileInputName },
        });
      },
    };
  }, [eventsDispatch]);
}
