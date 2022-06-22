import { AdminReducerActions } from 'admin/adminReducer';
import { switchEditMode, switchSaveButton } from 'admin/Events/eventsReducer';
import { downloadFilesFirebase } from 'api/firebaseStorage/downloadFilesFirebase';
import { updateData } from 'api/updateData';
import { firebaseError } from 'helpers';
import { Dispatch, Fragment, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
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
  editMode,
  saveButton,
  files,
  fileInputName,
  isFileInputMultiple,
  adminDispatch,
  eventsDispatch,
}: EventsProps) {
  usePageChanged({ eventsDispatch });
  useEventsList({ eventsDispatch, editMode });
  const { paramsName, paramsId } = useSplitParams();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e.target) return;
    const selectedEvent = (e.target as HTMLButtonElement).dataset
      .btnName as EventNames;
    let imgs: string[] | undefined = [];
    const asyncer = async () => {
      switch (selectedEvent) {
        case EventNames.New: {
          break;
        }
        case EventNames.Edit: {
          switchEditMode(eventsDispatch, true);
          break;
        }
        case EventNames.EditOff: {
          switchEditMode(eventsDispatch, false);
          break;
        }
        case EventNames.Save: {
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

  if (!eventsList || !paramsName) return null;

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
                  ? `/admin/${paramsName}/new`
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
