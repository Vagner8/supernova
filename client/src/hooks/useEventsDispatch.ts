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
  SaveFiles,
  DeleteOneFile,
  SwitchEditMode,
} from 'admin/Events/eventsState';
import { Dispatch, useMemo } from 'react';

export function useEventsDispatch(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  return useMemo(() => {
    return {
      CleanupProfile() {
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

      saveFiles({
        files,
        isFileInputMultiple,
        fileInputName,
      }: SaveFiles['payload']) {
        eventsDispatch({
          type: EventsStrAction.SaveFiles,
          payload: { files, fileInputName, isFileInputMultiple },
        });
      },

      deleteOneFile({ fileName }: DeleteOneFile['payload']) {
        eventsDispatch({
          type: EventsStrAction.DeleteOneFile,
          payload: { fileName },
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

      selectTableRow({ rowId, select }: SelectTableRow['payload']) {
        eventsDispatch({
          type: EventsStrAction.SelectTableRow,
          payload: { rowId, select },
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
