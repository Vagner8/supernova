import { ChangeHandler } from '../../share/shareTypes';
import styles from './switch.module.sass';

interface Props {
  id: string
  checked: boolean;
  onChange: ChangeHandler
}

export function Switch({ id, checked, onChange }: Props) {
  return (
    <div className={`${styles.SwitchComponent} switch`}>
      <label>
        off
        <input id={id} type="checkbox" checked={checked} onChange={onChange}/>
        <span className="lever" />
        on
      </label>
    </div>
  );
}
