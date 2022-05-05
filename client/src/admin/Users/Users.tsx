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
  UsersReducerActions,
  UsersState,
  DropListActionType,
  UsersForTable,
} from './usersState/usersTypes';

interface UsersTableProps {
  usersForTable: UsersForTable[];
  isAllUsersSelected: boolean;
  selectUsers: ChangeHandler;
  onChangeSwitch: ChangeHandler;
  usersDispatch: Dispatch<UsersReducerActions>;
}

function UsersTable({
  usersForTable,
  isAllUsersSelected,
  selectUsers,
  onChangeSwitch,
  usersDispatch,
}: UsersTableProps) {
  useEffect(() => {
    usersDispatch({
      type: DropListActionType.AdjustDropList,
      payload: {
        numberSelectedUsers: usersForTable.filter((user) => user.selected)
          .length,
      },
    });
  }, [usersDispatch, usersForTable]);
  return (
    <div className={styles.UsersTable_Component}>
      <ul className={styles.list}>
        <TableListHeader selected={isAllUsersSelected} onChange={selectUsers} />
        {usersForTable.map((user) => {
          const {
            userId,
            name,
            surname,
            phone,
            email,
            img,
            selected,
            disabled,
            role,
          } = user;
          return (
            <TableListRow
              key={userId}
              id={userId}
              img={img}
              disabled={disabled}
              selected={selected}
              columns={[userId, name, surname, phone, email, role, 'status']}
              onChangeCheckbox={selectUsers}
              onChangeSwitch={onChangeSwitch}
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
  const { usersForTable, isAllUsersSelected, isFetching } = usersState;
  useFetchUsers(
    usersDispatch,
    UsersActionType.SetUsersForTable,
    UsersAPI.Users,
  );

  console.log('Users');

  const selectUsers: ChangeHandler = ({ target }) => {
    if (target) {
      usersDispatch({
        type: UsersActionType.SelectionUsers,
        payload: { id: target.id },
      });
    }
  };

  const onChangeSwitch: ChangeHandler = ({ target }) => {
    if (target) {
      usersDispatch({
        type: UsersActionType.SwitchUserStatus,
        payload: { userId: target.id },
      });
    }
  };

  return (
    <div className={styles.Users_Module}>
      {!usersForTable || isFetching ? (
        <Preloader />
      ) : (
        <UsersTable
          usersForTable={usersForTable}
          isAllUsersSelected={isAllUsersSelected}
          selectUsers={selectUsers}
          onChangeSwitch={onChangeSwitch}
          usersDispatch={usersDispatch}
        />
      )}
    </div>
  );
}
