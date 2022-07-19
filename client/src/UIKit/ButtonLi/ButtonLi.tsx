import { MouseEvent } from 'react';
import { Icon, IconName } from 'UIKit';
import styles from './buttonLi.module.css';

interface ButtonLiProps {
  title: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: IconName
}

export function ButtonLi({
  title,
  icon,
  onClick,
}: ButtonLiProps) {
  return (
    <li className={styles.ButtonLi}>
      <button data-btn-name={title} onClick={onClick}>
        {title}
        {icon ? <Icon icon={icon} type="in-button" /> : null}
      </button>
    </li>
  );
}
