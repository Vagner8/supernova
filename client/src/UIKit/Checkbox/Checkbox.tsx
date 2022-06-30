import { useState } from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps {
  checkboxId: string;
  onClickCheckbox: (checked: boolean, checkboxId: string) => void;
}

export function Checkbox({ checkboxId, onClickCheckbox }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    onClickCheckbox(!checked, checkboxId);
    setChecked(!checked);
  };

  return (
    <div className={styles.Checkbox}>
      <label>
        <input type="checkbox" />
        <button
          className={styles[checked ? 'checked' : '']}
          onClick={handleClick}
        ></button>
      </label>
    </div>
  );
}
