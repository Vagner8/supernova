import { AdminState } from 'admin/adminReducer';
import { useLocalStorageData } from 'hooks';
import { NavLink } from 'react-router-dom';
import { Avatar, ButtonIcon } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  adminLogin: AdminState['adminLogin'];
  adminAvatar: AdminState['adminAvatar'];
}

export function Navbar({ adminLogin, adminAvatar }: NavbarProps) {
  const adminId = useLocalStorageData('adminId')
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <ButtonIcon icon="menu" type="white-icon" dataPopup={'drawer'}  />
      </div>
      <div className={styles.right}>
        <NavLink
          className={styles.avatar_link}
          to={`/admin/users/${adminId}`}
        >
          <p className={styles.login}>{adminLogin}</p>
          <Avatar url={adminAvatar} size="xs" />
        </NavLink>
      </div>
    </nav>
  );
}
