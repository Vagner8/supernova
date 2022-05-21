import { ChangeEvent, FocusEvent, useState } from 'react';
import { Visibility } from 'UIKit';
import styles from './input.module.css';

interface InputProps {
  label: string;
  value: string;
  errorField: string | null;
  errorMessage: string | null;
  type?: 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type,
  value,
  label,
  errorField,
  errorMessage,
  onChange,
}: InputProps) {
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

  const switchInputType = (trigger: boolean) => {
    return trigger ? 'password' : 'text';
  };

  const showError = (
    message: string | null,
    field: string | null,
    inputLabel: string,
  ): boolean => {
    if (message && !field) {
      return true;
    }
    if (message && field) {
      return field === inputLabel ? true : false;
    }
    return false;
  };

  return (
    <div role="group" className={`${styles.Input} ${styles[active]}`}>
      <label
        className={`${styles.label} ${
          styles[showError(errorMessage, errorField, label) ? 'error' : '']
        }`}
        htmlFor={label}
      >
        {label}{' '}
        {showError(errorMessage, errorField, label) ? `- ${errorMessage}` : null}
      </label>
      <input
        id={label}
        className={`${styles.field} ${
          styles[showError(errorMessage, errorField, label) ? 'error' : '']
        }`}
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
