import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { useEventsList } from 'hooks';
import { Dispatch, useMemo } from 'react';
import styles from './users.module.css';

interface UsersProps {
  eventsList: EventsState['eventsList'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export default function Users({ eventsDispatch, eventsList }: UsersProps) {
  useEventsList({
    eventsDispatch,
    newEventsList: useMemo(() => [EventNames.New], []),
  });
  return (
    <div className={styles.Users}>
      <h1>Users</h1>
    </div>
  );
}
