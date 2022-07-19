import { AdminReducerActions } from 'admin/adminState';
import { useEventsDispatch, useSplitParams, useEventsList } from 'hooks';
import { Dispatch, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLi, Dropdown } from 'UIKit';
import styles from './events.module.css';
import { useEvents } from './eventsHooks.ts/useEvents';
import { EventNames, EventsReducerActions, EventsState } from './eventsState';

interface EventsProps {
  popup: EventsState['popup'];
  eventsList: EventsState['eventsList'];
  profile: EventsState['profile'];
  changedProfile: EventsState['changedProfile'];
  editMode: EventsState['editMode'];
  isSomeRowSelected: boolean | undefined;
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
  adminDispatch,
  eventsDispatch,
  selectTableRowsIds,
}: EventsProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  useEventsList({ isSomeRowSelected, editMode, eventsDispatch });
  const { categoryParam, itemId } = useSplitParams();
  const navigate = useNavigate();
  const fromUseEvents = useEvents({
    itemId: profile?.itemId,
    adminDispatch,
    eventsDispatch,
  });

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('onClick')
    if (!e.target) return;
    const selectedEvent = (e.target as HTMLButtonElement).getAttribute(
      'data-btn-name',
    );
    const asyncer = async () => {
      switch (selectedEvent) {
        case EventNames.New: {
          eventsAction.switchEditMode({ editMode: true })
          navigate(`/admin/${categoryParam}/new`);
          console.log(editMode)
          break;
        }
        case EventNames.Edit: {
          eventsAction.switchEditMode({ editMode: true });
          break;
        }
        case EventNames.EditOff: {
          eventsAction.switchEditMode({ editMode: false });
          eventsAction.restoreProfile();
          break;
        }
        case EventNames.Save: {
          if (itemId === 'new') {
            return await fromUseEvents.newItem(profile);
          }
          if (Object.values(changedProfile).length) {
            await fromUseEvents.updateItem(changedProfile);
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
