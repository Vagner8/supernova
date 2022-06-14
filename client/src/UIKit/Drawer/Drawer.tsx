import { AdminState } from 'admin/adminReducer';
import { Icon, MenuItem } from 'UIKit';
import { IconName } from 'UIKit/Icon/Icon';
import styles from './drawer.module.css';

interface DrawerProps {
  drawer: AdminState['drawer'];
}

type Staff = [string, string, IconName];

const staffs: Staff[] = [
  ['/admin', 'home', 'home'],
  ['/admin/users', 'users', 'people'],
];

export function Drawer({ drawer }: DrawerProps) {
  return (
    <div
      data-not-close-drawer 
      className={`${styles.Drawer} ${styles[drawer]}`}
    >
      <div className={styles.top}>
        <button className={styles.close}>
          <Icon icon="chevron_left" />
        </button>
      </div>
      <div className={styles.staffs}>
        {staffs.map(([to, name, icon]) => {
          return <MenuItem key={name} title={name} icon={icon} to={to} />;
        })}
      </div>
    </div>
  );
}
