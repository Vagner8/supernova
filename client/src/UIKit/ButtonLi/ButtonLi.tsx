import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconName } from 'UIKit';
import styles from './buttonLi.module.css';

interface ButtonLiProps {
  title: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  linkPath?: string;
  icon?: IconName
}

export function ButtonLi({
  title,
  icon,
  linkPath,
  onClick,
}: ButtonLiProps) {
  return (
    <li className={styles.ButtonLi}>
      {linkPath ? <Link to={linkPath} /> : null}
      <button data-btn-name={title} onClick={onClick}>
        {title}
        {icon ? <Icon icon={icon} type="in-button" /> : null}
      </button>
    </li>
  );
}
