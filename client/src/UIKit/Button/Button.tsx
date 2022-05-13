import { MouseEvent } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type: 'submit' | 'button';
  size: 'large';
  title: string;
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ title, type, size, clickHandler }: ButtonProps) {
  return (
    <button
      className={`${styles.Button} ${styles[size]}`}
      type={type}
      onClick={clickHandler}
    >
      {title}
    </button>
  );
}

Button.defaultProps = {
  size: 'normal'
}