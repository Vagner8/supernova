import { MouseEvent, ReactElement } from 'react';
import { Icon } from 'UIKit/Icon/Icon';
import styles from './Button.module.css';

interface ButtonProps {
  type: 'submit' | 'button';
  size: 'large' | 'normal';
  title: string;
  disabled: boolean;
  icon?: ReactElement<typeof Icon>;
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  title,
  type,
  size,
  disabled,
  icon,
  clickHandler,
}: ButtonProps) {
  return (
    <button
      className={`${styles.Button} ${styles[size]} ${
        styles[disabled ? 'disabled' : '']
      }`}
      type={type}
      disabled={disabled}
      onClick={clickHandler}
    >
      {title}
      <div className={styles.icon}>{icon}</div>
    </button>
  );
}

Button.defaultProps = {
  size: 'normal',
  disabled: false,
};
