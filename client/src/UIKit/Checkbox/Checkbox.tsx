import { useState } from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps {
  itemId: string;
  onClickCheckbox: (rowId: string) => void;
  className?: string;
}

export function Checkbox({
  className,
  itemId,
  onClickCheckbox,
}: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    onClickCheckbox(itemId);
    setChecked(!checked);
  };

  return (
    <div className={`${styles.Checkbox} ${className}`}>
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
