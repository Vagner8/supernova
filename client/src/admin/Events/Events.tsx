import { AdminReducerActions } from 'admin/adminState';
import { useSplitPathname, useEventsList } from 'hooks';
import { Dispatch, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLi, Dropdown } from 'UIKit';
import styles from './events.module.css';
import { useEvents } from './eventsHooks.ts/useEvents';
import { EventNames, EventsReducerActions, EventsState, useEventsDispatch } from './eventsState';

interface EventsProps {
  popup: EventsState['popup'];
  eventsList: EventsState['eventsList'];
  profile: EventsState['profile'];
  changedProfile: EventsState['changedProfile'];
  editMode: EventsState['editMode'];
  isSomeRowSelected: boolean | undefined;
  mediaFiles: EventsState['mediaFiles'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  selectTableRowsIds?: string[];
}

export function Events({
  popup,
  eventsList,
  changedProfile,
  profile,
  editMode,
  isSomeRowSelected,
  mediaFiles,
  adminDispatch,
  eventsDispatch,
  selectTableRowsIds,
}: EventsProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEventsList({ isSomeRowSelected, editMode, eventsDispatch });
  const { categoryParam, itemId } = useSplitPathname();
  const navigate = useNavigate();
  const fromUseEvents = useEvents({
    itemId: profile?.itemId,
    adminDispatch,
    eventsDispatch,
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e.target) return;
    const selectedEvent = (e.target as HTMLButtonElement).getAttribute(
      'data-btn-name',
    );
    const asyncer = async () => {
      switch (selectedEvent) {
        case EventNames.New: {
          navigate(`/admin/${categoryParam}/new`);
          break;
        }
        case EventNames.Edit: {
          eventsAction.setEventsState({ editMode: true });
          break;
        }
        case EventNames.EditOff: {
          eventsAction.setEventsState({ editMode: false });
          eventsAction.restoreProfile();
          break;
        }
        case EventNames.Save: {
          if (itemId === 'new') {
            return await fromUseEvents.newItem(profile);
          }
          if (Object.values(changedProfile).length || mediaFiles.length) {
            await fromUseEvents.updateItem(changedProfile, mediaFiles);
            eventsAction.setEventsState({
              copyProfile: null,
              changedProfile: {},
              mediaFiles: [],
              editMode: false,
            });
          }
          break;
        }
        case EventNames.Delete: {
          await fromUseEvents.deleteItems(selectTableRowsIds);
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
