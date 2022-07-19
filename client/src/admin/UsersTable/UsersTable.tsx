import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './usersTable.module.css';
import { useFetchToGetUsersForTable } from './usersTableHooks/useFetchToGetUsersForTable';

interface UsersTableProps {
  users: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function UsersTable({
  users,
  eventsDispatch,
  adminDispatch,
}: UsersTableProps) {
  useFetchToGetUsersForTable(eventsDispatch, adminDispatch);
  return (
    <div className={styles.UsersTable}>
      <Table
        tableRows={users}
        eventsDispatch={eventsDispatch}
        adminDispatch={adminDispatch}
      />
    </div>
  );
}
