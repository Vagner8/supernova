import { OperationResult } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { ChangeEvent, FocusEvent, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonIcon } from 'UIKit';
import styles from './input.module.css';

export interface InputProps {
  label: string;
  value: string;
  type: 'password' | 'text';
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: OperationResult['message'];
  errorField?: OperationResult['field'];
  pointName?: string;
  required?: boolean;
}

export function Input({
  type,
  value,
  label,
  editMode,
  onChange,
  errorMessage,
  errorField,
  pointName,
  required,
}: InputProps) {
  const [active, setActive] = useState<'active' | ''>('');
  const [hidePassword, setHidePassword] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setActive('');
  }, [location])

  useEffect(() => {
    if (value) {
      setActive('active');
    }
  }, [value]);

  const onFocus = () => setActive('active')

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setActive('');
    }
  };
  const onClick = () => setHidePassword(!hidePassword)

  const switchInputType = (trigger: boolean) => {
    return trigger ? 'password' : 'text';
  };

  const showError = (): boolean => {
    if (!errorMessage) return false;
    if (!errorField) return false;
    if (errorField !== label) return false;
    return true;
  };

  // console.log('Input')

  if (!editMode) return null;
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
        data-point-name={pointName}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === 'password' ? (
        <div className={styles.button_icon}>
          <ButtonIcon
            onClick={onClick}
            icon="visibility"
            switchTo="visibility_off"
          />
        </div>
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
