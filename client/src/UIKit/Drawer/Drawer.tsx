import { AdminState } from 'admin/adminReducer';
import { MenuItem, IconName, ButtonIcon } from 'UIKit';
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
      className={`${styles.Drawer} ${styles[drawer]}`}
      data-set="not-close-drawer"
    >
      <div className={styles.top}>
        <ButtonIcon icon="chevron_left" />
      </div>
      <div className={styles.staffs}>
        {staffs.map(([to, name, icon]) => {
          return <MenuItem key={name} title={name} icon={icon} to={to} />;
        })}
      </div>
    </div>
  );
}
