import { MouseEvent } from 'react';
import { Icon } from 'UIKit/Icon/Icon';
import styles from './Visibility.module.css';

interface VisibilityProps {
  visibility: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Visibility({
  visibility,
  onClick,
}: VisibilityProps) {
  return (
    <button onClick={onClick} className={styles.Visibility} type='button'>
      {visibility ? <Icon icon="visibility" /> : <Icon icon="visibility_off" />}
    </button>
  );
}
