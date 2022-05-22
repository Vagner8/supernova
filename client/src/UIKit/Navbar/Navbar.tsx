import { NavLink } from 'react-router-dom';
import { Icon } from 'UIKit';
import { Avatar } from 'UIKit';
import styles from './navbar.module.css';

export function Navbar() {
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
        <NavLink to="/admin/profile">
          <Avatar url="https://www.fandimefilmu.cz/files/images/2020/01/14/article_main_dl0em0xw3c958ftm.jpg" />
        </NavLink>
      </div>
    </nav>
  );
}
