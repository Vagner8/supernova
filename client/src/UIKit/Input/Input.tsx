import { Err } from 'api/fetcher';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Visibility } from 'UIKit';
import styles from './input.module.css';

interface InputProps {
  label: string;
  value: string;
  error: Err | null
  type: 'password' | 'text';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type,
  value,
  label,
  error,
  onChange,
}: InputProps) {
  const [active, setActive] = useState<'active' | ''>('');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (!value) return
    setActive('active')
  }, [value])

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

  const switchInputType = (trigger: boolean) => {
    return trigger ? 'password' : 'text';
  };

  const showError = (err: Err | null, inputLabel: string): boolean => {
    if (!err) return false
    if (err.field === null) return true
    if (err.field !== inputLabel) return false
    return true
  }

  return (
    <div role="group" className={`${styles.Input} ${styles[active]}`}>
      <label
        className={`${styles.label} ${showError(error, label) && styles.error}`}
        htmlFor={label}
      >
        {`${label} ${showError(error, label) ? `- ${error?.message}` : ''}`}
      </label>
      <input
        id={label}
        className={`${styles.field} ${showError(error, label) && styles.error}`}
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