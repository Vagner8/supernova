import { AdminReducerActions, AdminState, switchDrawer } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  ownerLogin: AdminState['ownerLogin'];
  ownerAvatar: AdminState['ownerAvatar'];
  adminDispatch: Dispatch<AdminReducerActions>
}

export function Navbar({
  ownerLogin,
  ownerAvatar,
  adminDispatch
}: NavbarProps) {
  const onClick = () => switchDrawer(adminDispatch, 'show')
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <button onClick={onClick} className={styles.button}>
          <Icon icon="menu" />
        </button>
      </div>
      <div className={styles.right}>
        <NavLink className={styles.avatar_link} to="/admin/owner">
          <p className={styles.login}>{ownerLogin}</p>
          <Avatar url={ownerAvatar} iconFontSize='34px' size="xs" />
        </NavLink>
      </div>
    </nav>
  );
}
