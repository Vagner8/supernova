import { OperationResult } from 'admin/adminReducer';
import { ChangeEvent, FocusEvent, memo, useEffect, useState } from 'react';
import { Visibility } from 'UIKit';
import styles from './input.module.css';

export interface InputProps {
  label: string;
  value: string;
  type: 'password' | 'text';
  errorMessage: OperationResult['message'] | undefined;
  errorField: OperationResult['field'] | undefined;
  formName?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type,
  value,
  label,
  errorMessage,
  errorField,
  formName,
  required,
  onChange,
}: InputProps) {
  const [active, setActive] = useState<'active' | ''>('');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (!value) return;
    setActive('active');
  }, [value]);

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

  const showError = (): boolean => {
    if (!errorMessage) return false;
    if (!errorField) return false;
    if (errorField !== label) return false;
    return true;
  };

  console.log('input');

  return (
    <div role="group" className={`${styles.Input} ${styles[active]}`}>
      <label
        className={`${styles.label} ${showError() && styles.error}`}
        htmlFor={label}
      >
        {`${label} ${showError() ? `- ${errorMessage}` : ''}`}
        <Star required={required} />
      </label>
      <input
        id={label}
        className={`${styles.field} ${showError() && styles.error}`}
        name={label}
        type={type === 'password' ? switchInputType(hidePassword) : type}
        value={value}
        data-form-name={formName}
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

interface StarProps {
  required: InputProps['required'];
}

function Star({ required }: StarProps) {
  if (!required) return null;
  return <span className={styles.Star}>*</span>;
}

export const InputMemo = memo(Input);
