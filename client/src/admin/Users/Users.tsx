import { Dispatch, useEffect } from 'react';
import { Preloader } from '../../components/Preloader/Preloader';
import {
  TableListHeader,
  TableListRow,
} from '../../components/TableList/TableList';
import { useFetchUsers, UsersAPI } from '../../hooks/useFetchUsers';
import { ChangeHandler } from '../../share/shareTypes';
import styles from './Users.module.sass';
import {
  UsersActionType,
  User,
  UsersReducerActions,
  UsersState,
  DropListActionType,
} from './usersState/usersTypes';

interface UsersTableProps {
  users: User[];
  isAllUsersSelected: boolean;
  selectUsers: ChangeHandler;
  usersDispatch: Dispatch<UsersReducerActions>
}

function UsersTable({
  users,
  isAllUsersSelected,
  selectUsers,
  usersDispatch,
}: UsersTableProps) {
  useEffect(() => {
    usersDispatch({
      type: DropListActionType.AdjustDropList,
      payload: {
        numberSelectedUsers: users.filter((user) => user.selected).length,
      },
    });
  }, [usersDispatch, users]);
  return (
    <div className={styles.UsersTable_Component}>
      <ul className={styles.list}>
        <TableListHeader selected={isAllUsersSelected} onChange={selectUsers} />
        {users.map((user) => {
          const { _id, selected, img } = user;
          const columns = ['_id', 'name', 'surname', 'email'];
          return (
            <TableListRow
              id={_id}
              key={_id}
              selected={selected}
              img={img}
              columns={Object.entries(user)
                .map(([key, value]) => {
                  if (columns.includes(key)) return value;
                  return false;
                })
                .filter((value) => value)}
              onChange={selectUsers}
            />
          );
        })}
      </ul>
    </div>
  );
}

interface UsersProps {
  usersState: UsersState;
  usersDispatch: Dispatch<UsersReducerActions>;
}

export default function Users({ usersState, usersDispatch }: UsersProps) {
  const { users, isAllUsersSelected, isFetching } = usersState;
  useFetchUsers(usersDispatch, UsersAPI.Users);

  const selectUsers: ChangeHandler = ({ target }) => {
    if (target) {
      usersDispatch({
        type: UsersActionType.SelectionUsers,
        payload: { id: target.id },
      });
    }
  };

  return (
    <div className={styles.Users_Module}>
      {!users || isFetching ? (
        <Preloader />
      ) : (
        <UsersTable
          users={users}
          isAllUsersSelected={isAllUsersSelected}
          selectUsers={selectUsers}
          usersDispatch={usersDispatch}
        />
      )}
    </div>
  );
}
