import { Checkbox } from '../Checkbox/Checkbox';
import { ChangeHandler } from '../../share/shareTypes';
import { User } from '../../admin/Users/usersState/usersTypes';
import styles from './TableList.module.sass';

interface TableListHeaderProps {
  selected: boolean;
  onChange: ChangeHandler;
}

export function TableListHeader({ selected, onChange }: TableListHeaderProps) {
  return (
    <li className="collection-item">
      <Checkbox id="all" selected={selected} onChange={onChange} />
    </li>
  );
}

interface TableRowProps {
  id: string;
  columns: string[];
  selected: boolean;
  onChange: ChangeHandler;
}

function TableRow({ id, columns, selected, onChange }: TableRowProps) {
  return (
    <li key={id} className={`${styles.item} collection-item`}>
      <div className={styles.left}>
        <Checkbox id={id} selected={selected} onChange={onChange} />
      </div>
      {columns.map((column) => (
        <div>{column}</div>
      ))}
    </li>
  );
}

interface TableListBodyProps {
  rows: User[];
  columns: string[];
  onChange: ChangeHandler;
}

export function TableListBody({ rows, columns, onChange }: TableListBodyProps) {
  return (
    <>
      {rows.map((row) => {
        const { _id, selected } = row;
        return (
          <TableRow
            key={_id}
            id={_id}
            columns={Object.entries(row).map(([key, value]) => {
              if (columns.includes(key)) return value;
              return false;
            }).filter((value) => value)}
            selected={selected}
            onChange={onChange}
          />
        );
      })}
    </>
  );
}
