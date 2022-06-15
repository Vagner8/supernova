import {
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Icon } from 'UIKit/Icon/Icon';
import styles from './button.module.css';

interface ButtonProps {
  size: 'large' | 'normal';
  title: string;
  disabled: boolean;
  type?: 'submit' | 'button';
  icon?: ReactElement<typeof Icon>;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  title,
  type = 'button',
  size,
  disabled,
  icon,
  children,
  onClick,
}: ButtonProps) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget.closest('button');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    createRipple(e);
  };

  return (
    <button
      className={`${styles.Button} ${styles[size]} ${
        styles[disabled ? 'disabled' : '']
      }`}
      type={type}
      disabled={disabled}
      onClick={handlerClick}
    >
      {children ? children : null}
      <span className={styles.title}>{title}</span>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      {isRippling ? (
        <span
          className={styles.ripple}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
    </button>
  );
}

Button.defaultProps = {
  size: 'normal',
  disabled: false,
};
