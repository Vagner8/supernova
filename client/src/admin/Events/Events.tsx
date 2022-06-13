import { AdminReducerActions } from 'admin/adminReducer';
import { downloadFilesFirebase } from 'api/firebaseStorage/downloadFilesFirebase';
import { updateData } from 'api/updateData';
import { firebaseError } from 'helpers';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  resetEventState,
  saveCopyOfPoints,
  switchEditAndEditOf,
  switchSaveEvent,
  deleteAllFiles,
} from './eventsReducer';

interface EventsProps {
  eventsList: EventsState['eventsList'];
  changedPoints: EventsState['changedPoints'];
  files: EventsState['files'];
  fileInputName: EventsState['fileInputName'];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Events({
  eventsList,
  changedPoints,
  files,
  fileInputName,
  isFileInputMultiple,
  adminDispatch,
  eventsDispatch,
}: EventsProps) {
  const params = useParams();

  const handleEvents = (target: HTMLButtonElement) => {
    const selectedEvent = target.dataset.eventName as EventNames;
    const ownerId = localStorage.getItem('ownerId');
    let imgUrls: string[] | undefined = [];
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
          saveCopyOfPoints(eventsDispatch);
          switchSaveEvent(eventsDispatch, 'hide');
          switchEditAndEditOf(eventsDispatch, EventNames.Edit);
          deleteAllFiles(eventsDispatch);
          if (files && files.length > 0) {
            imgUrls = await downloadFilesFirebase({
              files,
              path: ['owner-img', ownerId, fileInputName],
              isFileInputMultiple,
              adminDispatch,
            });
            if (!imgUrls)
              return firebaseError(adminDispatch, 'no img url to show');
            if (!changedPoints?.imgUrls?.avatar)
              return firebaseError(adminDispatch, 'no img to show');
            changedPoints.imgUrls.avatar = imgUrls;
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
      <Dropdown title="events" handleEvents={handleEvents} list={eventsList} />
    </div>
  );
}
