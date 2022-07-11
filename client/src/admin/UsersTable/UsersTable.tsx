import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './usersTable.module.css';
import { useFetchToGetUsersForTable } from './usersTableHooks/useFetchToGetUsersForTable';

interface UsersProps {
  users: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Users({
  users,
  eventsDispatch,
  adminDispatch,
}: UsersProps) {
  useFetchToGetUsersForTable(eventsDispatch, adminDispatch);
  return (
    <div className={styles.Users}>
      <div className={styles.right}>
        <Table rows={users} eventsDispatch={eventsDispatch} />
      </div>
      <div className={styles.left}></div>
    </div>
  );
}
