import { NavLink } from 'react-router-dom';
import { Icon } from 'UIKit';
import { Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  avatar: string | undefined
  ownerName: string | undefined
}

export function Navbar({avatar, ownerName}: NavbarProps) {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <button className={styles.button}>
          <Icon icon="menu" />
        </button>
        <NavLink to="/admin" className={styles.logo}>
          Logo
        </NavLink>
      </div>
      <div className={styles.right}>
        <NavLink className={styles.avatar_link} to="/admin/profile">
          <p className={styles.owner_name}>{ownerName}</p>
          <Avatar url={avatar} />
        </NavLink>
      </div>
    </nav>
  );
}
