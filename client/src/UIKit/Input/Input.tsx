import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { Visibility } from 'UIKit/Visibility/Visibility';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  value: string;
  type?: 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ type, value, label, onChange }: InputProps) {
  const [active, setActive] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const onFocus = () => {
    setActive('active');
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setActive('');
    }
  };
  const onClick = () => {
    setHidePassword(!hidePassword);
  };

  const switchInputType = (a: boolean) => {
    return a ? 'password' : 'text';
  };

  return (
    <div className={`${styles.Input} ${styles[active]}`}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        className={styles.field}
        name={label}
        type={type === 'password' ? switchInputType(hidePassword) : type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === 'password' ? (
        <Visibility onClick={onClick} visibility={hidePassword} />
      ) : null}
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
};
