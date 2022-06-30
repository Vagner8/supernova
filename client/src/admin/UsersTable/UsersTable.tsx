import { AdminReducerActions } from 'admin/adminReducer';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsReducer';
import { useFetchUsersForTable } from 'api/users/useFetchUsersForTable';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './usersTable.module.css';

interface UsersProps {
  users: EventsState['users'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Users({
  users,
  eventsDispatch,
  adminDispatch,
}: UsersProps) {
  useFetchUsersForTable(eventsDispatch, adminDispatch);

  const onClickCheckbox = (checked: boolean, checkboxId: string) => {
    console.log(
      checked, checkboxId
    )
  }

  return (
    <div className={styles.Users}>
      <div className={styles.right}>
        <Table
          rows={users}
          sort={['avatar', 'name', 'surname', 'phone', 'email', 'rule']}
          onClickCheckbox={onClickCheckbox}
        />
      </div>
      <div className={styles.left}>

      </div>
    </div>
  );
}
