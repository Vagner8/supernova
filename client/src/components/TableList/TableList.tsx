import { NavLink } from 'react-router-dom';
import uniqid from 'uniqid';
import { Checkbox } from '../Checkbox/Checkbox';
import { ChangeHandler } from '../../share/shareTypes';
import styles from './TableList.module.sass';

interface TableListHeaderProps {
  selected: boolean;
  onChange: ChangeHandler;
}

export function TableListHeader({ selected, onChange }: TableListHeaderProps) {
  return (
    <li className={styles.TableListHeader_Component}>
      <Checkbox
        label="select all"
        id="all"
        selected={selected}
        onChange={onChange}
      />
    </li>
  );
}

interface TableRowProps {
  id: string;
  columns: string[];
  selected: boolean;
  img?: string;
  onChange: ChangeHandler;
}

export function TableListRow({
  id,
  img,
  columns,
  selected,
  onChange,
}: TableRowProps) {
  return (
    <li className={styles.TableListRow_Component}>
      <Checkbox id={id} selected={selected} onChange={onChange} />
      <NavLink className={styles.NavLink} to={`/admin/profile/${id}`}>
        {img ? <img className={styles.img} src={img} alt="" /> : null}
        {columns.map((column) => (
          <div key={uniqid()} className={styles.column}>
            <p>{column}</p>
          </div>
        ))}
      </NavLink>
    </li>
  );
}

TableListRow.defaultProps = {
  img: '',
};
