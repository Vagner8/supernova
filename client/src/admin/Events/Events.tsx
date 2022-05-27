import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  EventNames,
  EventsReducerActions,
  EventsStrAction,
} from './eventsReducer';

interface EventsProps {
  events: string[];
  editMode: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Events({
  events,
  editMode,
  eventsDispatch,
  adminDispatch,
}: EventsProps) {
  const handleTarget = (target: HTMLButtonElement) => {
    if (!target.textContent) return;
    const eventName = target.textContent as EventNames;
    if (eventName === EventNames.Edit || eventName === EventNames.EditOff) {
      eventsDispatch({
        type: EventsStrAction.SetEditMode,
      });
    }
  };

  return (
    <div className={styles.Events}>
      <Dropdown handleTarget={handleTarget} list={events} />
    </div>
  );
}
