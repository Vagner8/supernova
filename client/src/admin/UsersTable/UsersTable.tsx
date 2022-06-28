import { AdminReducerActions } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { useFetchUsersForTable } from 'api/users/useFetchUsersForTable';
import { Dispatch, useRef } from 'react';
import styles from './usersTable.module.css';

interface UsersProps {
  eventsList: EventsState['eventsList'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Users({
  eventsList,
  eventsDispatch,
  adminDispatch,
}: UsersProps) {
  useFetchUsersForTable(eventsDispatch, adminDispatch);
  return (
    <div className={styles.Users}>
      <h1>Users</h1>
    </div>
  );
}
