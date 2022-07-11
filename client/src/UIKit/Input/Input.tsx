import { ChangeEvent, FocusEvent, memo, useState } from 'react';
import { ButtonIcon } from 'UIKit';
import styles from './input.module.css';
import { useActiveClass, useErrorMessage } from './useInput';

export interface InputProps {
  label: string;
  value: string;
  type: 'password' | 'text';
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldError?: string;
  messageError?: string;
  pointName?: string;
  required?: boolean;
  isTextareaField?: boolean;
}

type PassType = 'password' | 'text';

export function Input({
  type,
  value,
  label,
  onChange,
  fieldError,
  messageError,
  pointName,
  required,
  isTextareaField,
}: InputProps) {
  const [passType, setPassType] = useState<PassType>('password');
  const [activeClass, setActiveClass] = useActiveClass(value);
  const strMessageError = useErrorMessage(messageError);

  const onFocus = () => setActiveClass('active');
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    e.target.value || setActiveClass('');
  const onClick = () => setPassType(passType === 'text' ? 'password' : 'text');

  return (
    <div role="group" className={`${styles.Input} ${styles[activeClass]}`}>
      <label
        className={`${styles.label} ${fieldError && styles.error}`}
        htmlFor={label}
      >
        {label} {strMessageError}
        <Star required={required} />
      </label>
      {isTextareaField ? (
        <textarea
          rows={0}
          id={label}
          className={`${styles.field} ${styles[activeClass]}`}
          name={label}
          value={value}
          data-point-name={pointName}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={label}
          className={`${styles.field} ${styles[activeClass]}`}
          name={label}
          type={type === 'password' ? passType : type}
          value={value}
          data-point-name={pointName}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
      {type === 'password' && (
        <ButtonIcon
          onClick={onClick}
          icon="visibility"
          switchTo="visibility_off"
        />
      )}
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
