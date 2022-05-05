import { NavLink } from 'react-router-dom';
import uniqid from 'uniqid';
import { Checkbox } from '../Checkbox/Checkbox';
import { ChangeHandler } from '../../share/shareTypes';
import styles from './TableList.module.sass';
import { Switch } from '../Switch/Switch';
import { Status } from '../Status/Status';

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
  img: string;
  selected: boolean;
  disabled: boolean;
  columns: string[];
  onChangeCheckbox: ChangeHandler;
  onChangeSwitch: ChangeHandler;
}

export function TableListRow({
  id,
  img,
  selected,
  columns,
  disabled,
  onChangeCheckbox,
  onChangeSwitch,
}: TableRowProps) {
  return (
    <li className={styles.TableListRow_Component}>
      <Checkbox id={id} selected={selected} onChange={onChangeCheckbox} />
      <NavLink className={styles.NavLink} to={`/admin/profile/${id}`}>
        {img ? <img className={styles.img} src={img} alt="" /> : null}
        {columns.map((column) => {
          if (column === 'status') {
            return (
              <div key={uniqid()} className={styles.column}>
                <Status disabled={disabled} />
              </div>
            )
          }
          return (
            <div key={uniqid()} className={styles.column}>
              <p>{column}</p>
            </div>
          );
        })}
      </NavLink>
      <Switch id={id} checked={!disabled} onChange={onChangeSwitch} />
    </li>
  );
}

TableListRow.defaultProps = {
  img: '',
};
