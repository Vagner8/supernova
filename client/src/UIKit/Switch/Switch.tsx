import { useState } from 'react';
import styles from './switch.module.css';

interface SwitchProps {
  disabled: boolean;
  label?: [string, string];
}

export function Switch({ label, disabled }: SwitchProps) {
  const [checkedClass, setCheckedClass] = useState<'' | 'checked'>(() =>
    disabled ? 'checked' : '',
  );
  const onClick = () => setCheckedClass(checkedClass ? '' : 'checked');

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.Switch} ${styles[checkedClass]}`}
    >
      <label>
        {label ? label[0] : null}
        <input type="checkbox" disabled />
        <span></span>
        {label ? label[1] : null}
      </label>
    </button>
  );
}
