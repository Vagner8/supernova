import { FilesReducerActions, FilesStrAction } from 'admin/filesReducer';
import { Dispatch } from 'react';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
} from './eventsReducer';

interface EventsProps {
  eventsList: EventsState['eventsList'];
  selectedEvent: EventsState['selectedEvent']
  eventsDispatch: Dispatch<EventsReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>;
}

export function Events({
  eventsList,
  eventsDispatch,
  filesDispatch,
}: EventsProps) {
  const handleTarget = (target: HTMLButtonElement) => {
    if (!target.textContent) return;
    const selectedEvent = target.textContent as EventNames;
    eventsDispatch({
      type: EventsStrAction.SaveSelectedEvent,
      payload: { selectedEvent },
    });
    if (selectedEvent === EventNames.EditOff) {
      filesDispatch({ type: FilesStrAction.DeleteAllFiles });
    }
  };

  return (
    <div className={styles.Events}>
      <Dropdown
        title="events"
        handleTarget={handleTarget}
        list={eventsList}
      />
    </div>
  );
}
