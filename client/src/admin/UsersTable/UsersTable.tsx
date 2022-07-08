import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useFetchUsersForTable } from 'api/users/useFetchUsersForTable';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './usersTable.module.css';

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
  useFetchUsersForTable(eventsDispatch, adminDispatch);
  return (
    <div className={styles.Users}>
      <div className={styles.right}>
        <Table
          rows={users}
          sort={['avatar', 'name', 'surname', 'phone', 'email', 'rule']}
          eventsDispatch={eventsDispatch}
        />
      </div>
      <div className={styles.left}>

      </div>
    </div>
  );
}
