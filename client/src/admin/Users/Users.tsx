import { DropList } from '../../components/DropList/DropList';
import { ChangeHandler, ClickHandler } from '../../share/shareTypes';
import { useAdminContext } from '../Admin';
import { TableUsers } from './TableUsers/TableUsers';
import styles from './Users.module.sass';
import {
  DropListActionType,
  TableActionType,
  Todo,
} from './usersState/usersTypes';

export default function Users() {
  const {
    users: {
      state: { users, dropList, editMode, isAllUsersSelected },
      dispatch,
    },
  } = useAdminContext();

  const onClickDropdown: ClickHandler = ({ target }) => {
    const { id } = target as HTMLButtonElement;
    if (id) {
      dispatch({
        type: DropListActionType.ToggleEditMode,
        payload: { id },
      });
    }
  };

  function setDropItemTitle(todo: string): string {
    if (todo === Todo.Edit) {
      return editMode ? 'edit off' : 'edit on';
    }
    return todo;
  }

  const selectUsers: ChangeHandler = ({ target }) => {
    if (target) {
      dispatch({
        type: TableActionType.SelectionUsers,
        payload: { id: target.id },
      });
    }
  };

  return (
    <div className={styles.Users_Module}>
      <DropList
        title="Actions"
        dropList={dropList ?? []}
        onClickDropdown={onClickDropdown}
        setDropItemTitle={setDropItemTitle}
      />
      <TableUsers
        isAllUsersSelected={isAllUsersSelected}
        users={users}
        selectUsers={selectUsers}
      />
    </div>
  );
}
