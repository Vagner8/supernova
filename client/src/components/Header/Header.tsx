import { Dispatch } from 'react';
import { DropList } from '../DropList/DropList';
import { ClickHandler } from '../../share/shareTypes';
import {
  DropListActionType,
  Todo,
  UsersReducerActions,
  UsersState,
} from '../../admin/Users/usersState/usersTypes';
import styles from './Header.module.sass';

interface Props {
  state: UsersState;
  dispatch: Dispatch<UsersReducerActions>;
}

export function Header({
  state: { dropList, editMode },
  dispatch,
}: Props) {
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

  return (
    <div className={styles.Header_Component}>
      <DropList
        title="Actions"
        dropList={dropList ?? []}
        onClickDropdown={onClickDropdown}
        setDropItemTitle={setDropItemTitle}
      />
    </div>
  );
}
