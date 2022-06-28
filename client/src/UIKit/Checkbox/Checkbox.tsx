import { useState } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
  onClick: (checked: boolean) => void;
}

export function Checkbox({ onClick }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    onClick(checked);
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
