import { AdminReducerActions } from 'admin/adminReducer';
import { Events } from 'admin/Events/Events';
import { EventsReducerActions, EventsType } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  avatar: string | undefined;
  ownerName: string | undefined;
  editMode: boolean;
  events: EventsType
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Navbar({
  avatar,
  ownerName,
  events,
  editMode,
  eventsDispatch,
  adminDispatch,
}: NavbarProps) {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.lift}>
        <button className={styles.button}>
          <Icon icon="menu" />
        </button>
        <Events
          events={events}
          editMode={editMode}
          eventsDispatch={eventsDispatch}
          adminDispatch={adminDispatch}
        />
      </div>
      <div className={styles.right}>
        <NavLink className={styles.avatar_link} to="/admin/profile">
          <p className={styles.owner_name}>{ownerName}</p>
          <Avatar url={avatar} size="xs" />
        </NavLink>
      </div>
    </nav>
  );
}
