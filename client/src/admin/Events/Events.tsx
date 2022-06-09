import { AdminReducerActions, saveNewAvatar } from 'admin/adminReducer';
import { firebaseSender } from 'api/firebaseSender';
import { updateData } from 'api/updateData';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  resetEventState,
  overwriteCopyOfPoints,
  switchEditAndEditOf,
  switchSaveEvent,
  deleteAllFiles,
} from './eventsReducer';

interface EventsProps {
  eventsList: EventsState['eventsList'];
  changedPoints: EventsState['changedPoints'];
  files: EventsState['files'];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  fileInputName: EventsState['fileInputName'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Events({
  eventsList,
  changedPoints,
  files,
  isFileInputMultiple,
  fileInputName,
  adminDispatch,
  eventsDispatch,
}: EventsProps) {
  const params = useParams();

  const handleTarget = (target: HTMLButtonElement) => {
    const selectedEvent = target.dataset.eventName as EventNames;
    const ownerId = localStorage.getItem('ownerId');
    const asyncer = async () => {
      switch (selectedEvent) {
        case EventNames.Edit: {
          switchEditAndEditOf(eventsDispatch, EventNames.EditOff);
          break;
        }
        case EventNames.EditOff: {
          switchEditAndEditOf(eventsDispatch, EventNames.Edit);
          resetEventState(eventsDispatch);
          break;
        }
        case EventNames.Save: {
          overwriteCopyOfPoints(eventsDispatch);
          switchSaveEvent(eventsDispatch, 'hide');
          switchEditAndEditOf(eventsDispatch, EventNames.Edit);
          deleteAllFiles(eventsDispatch);
          const imgUrls = await firebaseSender({
            adminDispatch,
            files,
            isFileInputMultiple,
            fileInputName,
            ownerId,
          });
          if (imgUrls && changedPoints?.personal?.avatar) {
            changedPoints.personal.avatar = imgUrls[0];
            saveNewAvatar(adminDispatch, imgUrls[0]);
          }
          await updateData({
            adminDispatch,
            params: params['*'],
            changedPoints,
          });
          break;
        }
      }
    };
    asyncer();
  };

  if (location.pathname === '/admin') return null;

  return (
    <div className={styles.Events}>
      <Dropdown title="events" handleTarget={handleTarget} list={eventsList} />
    </div>
  );
}
