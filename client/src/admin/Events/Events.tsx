import { AdminReducerActions } from 'admin/adminReducer';
import { updateData } from 'api/updateData';
import {
  useAdminDispatch,
  useEventsDispatch,
  useSplitParams,
  useFirebaseStorage,
  useEventsList,
} from 'hooks';
import { Dispatch, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLi, Dropdown } from 'UIKit';
import styles from './events.module.css';
import { EventNames, EventsReducerActions, EventsState } from './eventsState';

interface EventsProps {
  popup: EventsState['popup'];
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  changedPoints: EventsState['changedPoints'];
  editMode: EventsState['editMode'];
  files: EventsState['files'];
  fileInputName: EventsState['fileInputName'];
  isFileInputMultiple: EventsState['isFileInputMultiple'];
  isSomeRowSelected: boolean | undefined;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Events({
  popup,
  eventsList,
  changedPoints,
  points,
  editMode,
  files,
  fileInputName,
  isFileInputMultiple,
  isSomeRowSelected,
  adminDispatch,
  eventsDispatch,
}: EventsProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  useEventsList({ isSomeRowSelected, editMode, eventsDispatch });
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
          eventsAction.restorePoints();
          break;
        }
        case EventNames.Save: {
          if (files?.length) {
            const firebaseUrls = await firebaseStorage.download(files);
            if (!firebaseUrls || !fileInputName) return;
            await updateData({
              adminDispatch,
              url: `/${categoryParam}/update/?id=${idParam}`,
              points: {
                imgs: {
                  [fileInputName]: firebaseUrls,
                },
              },
            });
          }
          if (!changedPoints)
            adminAction.saveOperationResult({
              status: 'warning',
              message: 'nothing to save',
            });
          if (changedPoints) {
            await updateData({
              adminDispatch,
              url: `/${categoryParam}/update/?id=${idParam}`,
              points: idParam === 'new' ? points : changedPoints,
            });
            eventsAction.deleteAllFiles();
          }
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
