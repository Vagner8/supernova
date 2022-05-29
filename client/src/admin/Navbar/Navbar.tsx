import { AdminReducerActions } from 'admin/adminReducer';
import { Events } from 'admin/Events/Events';
import {
  DependentState,
  EventsReducerActions,
  EventsType,
} from 'admin/Events/eventsReducer';
import { FilesReducerActions } from 'admin/filesReducer';
import { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Avatar } from 'UIKit';
import styles from './navbar.module.css';

interface NavbarProps {
  editMode: boolean;
  events: EventsType;
  dependentState: DependentState | null;
  saveButton: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>
}

export function Navbar({
  events,
  editMode,
  dependentState,
  saveButton,
  eventsDispatch,
  adminDispatch,
  filesDispatch
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
          dependentState={dependentState}
          saveButton={saveButton}
          eventsDispatch={eventsDispatch}
          adminDispatch={adminDispatch}
          filesDispatch={filesDispatch}
        />
      </div>
      <div className={styles.right}>
        {/* <NavLink className={styles.avatar_link} to="/admin/profile">
          <p className={styles.owner_name}>{ownerName}</p>
          <Avatar url={avatar} size="xs" />
        </NavLink> */}
      </div>
    </nav>
  );
}
