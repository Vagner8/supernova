import { capitalizer } from 'helpers';
import { NavLink } from 'react-router-dom';
import { IconName, Icon } from 'UIKit';
import styles from './menuItem.module.css';

interface MenuItemProps {
  icon: IconName;
  title: string;
  to: string;
}

export function MenuItem({ icon, title, to }: MenuItemProps) {
  return (
    <NavLink className={styles.link} to={to}>
      <div className={styles.MenuItem}>
        <Icon icon={icon} />
        <p>{capitalizer({ index: 0, str: title })}</p>
      </div>
    </NavLink>
  );
}
