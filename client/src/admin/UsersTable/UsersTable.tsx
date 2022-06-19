import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { useFetchUsersForTable } from 'api/users/useFetchUsersForTable';
import { useEventsList } from 'hooks';
import { Dispatch, useRef } from 'react';
import styles from './usersTable.module.css';

interface UsersProps {
  eventsList: EventsState['eventsList'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export default function Users({ eventsList,  eventsDispatch }: UsersProps) {
  useFetchUsersForTable()
  useEventsList({
    eventsDispatch,
    newEventsList: useRef([EventNames.New, EventNames.Delete]).current
  });
  return (
    <div className={styles.Users}>
      <h1>Users</h1>
    </div>
  );
}
