import {
  EventsReducerActions,
  EventsState,
  EventsStrAction,
  FileInputName,
} from 'admin/Events/eventsReducer';
import { Dispatch, useMemo } from 'react';
import { UserPointsType } from '../../../common/src/userTypes';

export function useEventsDispatch(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  return useMemo(() => {
    return {
      cleanupPoints() {
        eventsDispatch({
          type: EventsStrAction.CleanupPoints
        });
      },

      savePopup(popup: EventsState['popup']) {
        eventsDispatch({
          type: EventsStrAction.SavePopup,
          payload: { popup },
        });
      },

      savePoints(points: UserPointsType) {
        eventsDispatch({
          type: EventsStrAction.SavePoints,
          payload: { points },
        });
      },

      saveCopyOfPoints() {
        eventsDispatch({ type: EventsStrAction.SaveCopyOfPoints });
      },

      pointsOnChange({
        name,
        value,
        pointName,
      }: {
        name: string;
        value: string;
        pointName: keyof EventsState['points'];
      }) {
        eventsDispatch({
          type: EventsStrAction.PointsOnChange,
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

      saveUsers(users: EventsState['users']) {
        eventsDispatch({
          type: EventsStrAction.SaveUsers,
          payload: { users },
        });
      },

      restorePoints() {
        eventsDispatch({ type: EventsStrAction.RestorePoints });
      },
    };
  }, [eventsDispatch]);
}
