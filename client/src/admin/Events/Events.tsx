import { Dispatch } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  deleteAllFiles,
  EventNames,
  EventsReducerActions,
  EventsState,
  saveSelectedEvent,
  showSaveEvent,
} from './eventsReducer';

interface EventsProps {
  eventsList: EventsState['eventsList'];
  selectedEvent: EventsState['selectedEvent']
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function Events({
  eventsList,
  eventsDispatch,
}: EventsProps) {

  const location = useLocation()

  const handleTarget = (target: HTMLButtonElement) => {
    if (!target.textContent) return;
    const selectedEvent = target.dataset.eventName as EventNames;
    saveSelectedEvent(eventsDispatch, selectedEvent)
    if (selectedEvent === EventNames.EditOff) {
      deleteAllFiles(eventsDispatch)
      showSaveEvent(eventsDispatch, false)
    }
  };

  if (location.pathname === '/admin') return null

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
