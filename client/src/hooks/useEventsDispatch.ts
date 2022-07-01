import {
  EventsReducerActions,
  EventsState,
  EventsStrAction,
} from 'admin/Events/eventsReducer';
import { Dispatch, useMemo } from 'react';
import { ImgsType } from '../../../common/src/commonTypes';
import { UserPointsType } from '../../../common/src/userTypes';

export function useEventsDispatch(
  eventsDispatch: Dispatch<EventsReducerActions>,
) {
  return useMemo(() => {
    return {
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
        fileInputName: keyof ImgsType;
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

      switchSaveButton(saveButton: EventsState['saveButton']) {
        eventsDispatch({
          type: EventsStrAction.SwitchSaveButton,
          payload: { saveButton },
        });
      },

      saveUsers(users: EventsState['users']) {
        eventsDispatch({
          type: EventsStrAction.SaveUsers,
          payload: { users },
        });
      },
    };
  }, [eventsDispatch]);
}
