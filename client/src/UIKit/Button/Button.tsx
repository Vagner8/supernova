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
  type: 'submit' | 'button';
  size: 'large' | 'normal';
  title: string;
  disabled: boolean;
  icon?: ReactElement<typeof Icon>;
  children?: ReactNode;
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  title,
  type,
  size,
  disabled,
  icon,
  children,
  clickHandler,
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

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (clickHandler) {
      clickHandler(e);
    }
    createRipple(e);
  };

  return (
    <button
      className={`${styles.Button} ${styles[size]} ${
        styles[disabled ? 'disabled' : '']
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
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
