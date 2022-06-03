import { AdminState } from 'admin/adminReducer';
import { Events } from 'admin/Events/Events';
import { NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  login: AdminState['login'];
  avatar: AdminState['avatar'];
}

export function Navbar({
  login,
  avatar,
}: NavbarProps) {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <button className={styles.button}>
          <Icon icon="menu" />
        </button>
      </div>
      <div className={styles.right}>
        <NavLink className={styles.avatar_link} to="/admin/profile">
          <p className={styles.login}>{login}</p>
          <Avatar url={avatar} size="xs" />
        </NavLink>
      </div>
    </nav>
  );
}
