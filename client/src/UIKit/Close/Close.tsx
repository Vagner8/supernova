import { MouseEvent } from 'react';
import { Icon } from 'UIKit';
import styles from './close.module.css'

interface CloseProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Close({ onClick }: CloseProps) {
  return (
    <div>
      <button onClick={onClick} className={styles.button}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
