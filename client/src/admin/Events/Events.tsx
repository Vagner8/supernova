import { AdminReducerActions } from 'admin/adminReducer';
import { switchEditMode, switchSaveButton } from 'admin/Events/eventsReducer';
import { downloadFilesFirebase } from 'api/firebaseStorage/downloadFilesFirebase';
import { updateData } from 'api/updateData';
import { createNewUser } from 'api/users/createNewUser';
import { firebaseError } from 'helpers';
import { useEventsDispatch } from 'hooks';
import { useFirebaseStorage } from 'hooks/useFirebaseStorage';
import { Dispatch, Fragment, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonLi, Dropdown, Icon } from 'UIKit';
import styles from './events.module.css';
import { useEventsList } from './eventsHooks.ts/useEventsList';
import { usePageChanged } from './eventsHooks.ts/usePageChanged';
import { useSplitParams } from './eventsHooks.ts/useSplitParams';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  saveCopyOfPoints,
  deleteAllFiles,
} from './eventsReducer';

interface EventsProps {
  popup: EventsState['popup'];
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  changedPoints: EventsState['changedPoints'];
  editMode: EventsState['editMode'];
  saveButton: EventsState['saveButton'];
  files: EventsState['files'];
  fileInputName: EventsState['fileInputName'];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Events({
  popup,
  eventsList,
  changedPoints,
  points,
  editMode,
  saveButton,
  files,
  fileInputName,
  isFileInputMultiple,
  adminDispatch,
  eventsDispatch,
}: EventsProps) {
  const eventsAction = useEventsDispatch(eventsDispatch)
  usePageChanged({ eventsDispatch });
  useEventsList({ eventsDispatch, editMode });
  const { categoryParam, idParam } = useSplitParams();
  const navigate = useNavigate();
  const firebaseStorage = useFirebaseStorage({
    paths: [categoryParam, idParam, fileInputName],
    isFileInputMultiple,
    adminDispatch,
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e.target) return;
    const selectedEvent = (e.target as HTMLButtonElement).getAttribute(
      'data-btn-name',
    );
    const asyncer = async () => {
      switch (selectedEvent) {
        case EventNames.New: {
          navigate('/admin/users/new');
          break;
        }
        case EventNames.Edit: {
          eventsAction.switchEditMode(true);
          break;
        }
        case EventNames.EditOff: {
          eventsAction.switchEditMode(false);
          break;
        }
        case EventNames.Save: {
          let firebaseUrls: string[] | undefined
          // if (idParam === 'new') {
          //   createNewUser(points, adminDispatch);
          //   // navigate('/admin/users')
          // }
          if (files?.length) {
            firebaseUrls = await firebaseStorage.download(files)
            eventsAction.deleteAllFiles();
          }

          // saveCopyOfPoints(eventsDispatch);
          // deleteAllFiles(eventsDispatch);
          // if (files && files.length > 0 && params['*']) {
          //   imgs = await downloadFilesFirebase({
          //     files,
          //     path: [params['*'], userId, fileInputName],
          //     isFileInputMultiple,
          //     adminDispatch,
          //   });
          //   if (!imgs)
          //     return firebaseError(adminDispatch, 'no img url to show');
          //   if (!changedPoints?.imgs?.avatar)
          //     return firebaseError(adminDispatch, 'no img to show');
          //   changedPoints.imgs.avatar = imgs;
          // }
          // await updateData({
          //   adminDispatch,
          //   params: params['*'],
          //   changedPoints,
          // });

          break;
        }
      }
    };
    asyncer();
  };

  if (!eventsList || !categoryParam) return null;

  return (
    <div className={styles.Events}>
      <Dropdown popup={popup} title="events">
        {eventsList.map((eventString) => {
          if (!eventString) return;
          return (
            <ButtonLi
              key={eventString}
              linkPath={
                eventString === EventNames.New
                  ? `/admin/${categoryParam}/new`
                  : undefined
              }
              icon={eventString === EventNames.Save ? 'save' : undefined}
              title={eventString}
              onClick={onClick}
            />
          );
        })}
      </Dropdown>
    </div>
  );
}
