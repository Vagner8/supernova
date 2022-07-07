import {
  EventsStrAction,
  FileInputName,
  ProfilesType,
  EventsReducerActions,
  EventsState,
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

      savePopup(popup: EventsState['popup']) {
        eventsDispatch({
          type: EventsStrAction.SavePopup,
          payload: { popup },
        });
      },

      savePoints(profile: ProfilesType) {
        eventsDispatch({
          type: EventsStrAction.SaveProfile,
          payload: { profile },
        });
      },

      saveProfileCopy() {
        eventsDispatch({ type: EventsStrAction.SaveProfileCopy });
      },

      profileOnChange({
        name,
        value,
        pointName,
      }: {
        name: string;
        value: string;
        pointName: keyof EventsState['profile'];
      }) {
        eventsDispatch({
          type: EventsStrAction.ProfileOnChange,
          payload: { name, value, pointName },
        });
      },

      saveEventsList(newEventsList: EventsState['eventsList']) {
        eventsDispatch({
          type: EventsStrAction.SaveEventsList,
          payload: { newEventsList },
        });
      },

      saveFiles({
        files,
        isFileInputMultiple,
        fileInputName,
      }: {
        files: File[];
        isFileInputMultiple: boolean;
        fileInputName: FileInputName;
      }) {
        eventsDispatch({
          type: EventsStrAction.SaveFiles,
          payload: { files, fileInputName, isFileInputMultiple },
        });
      },

      deleteOneFile(fileName: string) {
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

      switchEditMode(editMode: EventsState['editMode']) {
        eventsDispatch({
          type: EventsStrAction.SwitchEditMode,
          payload: { editMode },
        });
      },

      saveUsers(rows: EventsState['rows']) {
        eventsDispatch({
          type: EventsStrAction.SaveRows,
          payload: { rows },
        });
      },

      restoreProfile() {
        eventsDispatch({ type: EventsStrAction.RestoreProfile });
      },

      selectRow(rowId: string, select: boolean) {
        eventsDispatch({
          type: EventsStrAction.SelectRow,
          payload: { rowId, select },
        });
      },
    };
  }, [eventsDispatch]);
}
