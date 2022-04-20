import {
  TableListBody,
  TableListHeader,
} from '../../../components/TableList/TableList';
import { ChangeHandler } from '../../../share/shareTypes';
import { User } from '../usersState/usersTypes';
import styles from './TableUsers.module.sass';

interface Props {
  isAllUsersSelected: boolean;
  users: User[];
  selectUsers: ChangeHandler;
}

export function TableUsers({ users, isAllUsersSelected, selectUsers }: Props) {
  return (
    <ul className={`${styles.TableUsers_Component} collection`}>
      <TableListHeader selected={isAllUsersSelected} onChange={selectUsers} />
      <TableListBody
        rows={users}
        columns={['_id', 'name', 'surname', 'email']}
        onChange={selectUsers}
      />
    </ul>
  );
}
