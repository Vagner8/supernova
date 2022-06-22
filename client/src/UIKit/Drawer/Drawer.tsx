import { EventsState } from 'admin/Events/eventsReducer';
import { MenuItem, IconName } from 'UIKit';
import styles from './drawer.module.css';

interface DrawerProps {
  popup: EventsState['popup'];
}

type Staff = [string, string, IconName];

const staffs: Staff[] = [
  ['/admin', 'home', 'home'],
  ['/admin/users', 'users', 'people'],
];

export function Drawer({ popup }: DrawerProps) {
  if (popup !== 'drawer') return null;
  return (
    <div className={styles.Drawer}>
      {staffs.map(([to, name, icon]) => {
        return <MenuItem key={name} title={name} icon={icon} to={to} />;
      })}
    </div>
  );
}
