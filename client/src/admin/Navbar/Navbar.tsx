import { AdminState } from 'admin/adminReducer';
import { NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  ownerLogin: AdminState['ownerLogin'];
  ownerAvatar: AdminState['ownerAvatar'];
}

export function Navbar({ ownerLogin, ownerAvatar }: NavbarProps) {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <button data-open-drawer className={styles.button}>
          <Icon icon="menu" />
        </button>
      </div>
      <div className={styles.right}>
        <NavLink className={styles.avatar_link} to="/admin/owner">
          <p className={styles.login}>{ownerLogin}</p>
          <Avatar url={ownerAvatar} size="xs" />
        </NavLink>
      </div>
    </nav>
  );
}
