import {
  AdminReducerActions,
  AdminState,
  AdminStrAction,
} from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
} from 'admin/Events/eventsReducer';
import {
  FilesReducerActions,
  FilesState,
  FilesStrAction,
} from 'admin/filesReducer';
import { ChangeEvent, Dispatch, Fragment, useEffect, useReducer } from 'react';
import { Avatar, Container, FileInput, Input, Point } from 'UIKit';
import styles from './profile.module.css';
import { profileInitState, profileReducer } from './profileReducer';

interface ProfileProps {
  editMode: EventsState['editMode'];
  files: FilesState['files'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>;
}

export default function Profile({
  editMode,
  files,
  adminDispatch,
  eventsDispatch,
  filesDispatch,
}: ProfileProps) {
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitState,
  );
  useEffect(() => {
    eventsDispatch({
      type: EventsStrAction.SaveEvents,
      payload: { events: [EventNames.Edit] },
    });
    eventsDispatch({
      type: EventsStrAction.SetDependentState,
      payload: { stateName: 'adminState' },
    });
  }, [eventsDispatch]);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    filesDispatch({
      type: FilesStrAction.SaveFiles,
      payload: { files: Array.from(e.target.files) },
    });
  };

  return (
    <Container>
      <div className={styles.Profile}>
        <div className={styles.lift}>
          {/* <Avatar url={personal.avatar} size="m" />
          <h6>
            {personal.name} {personal.surname}
          </h6> */}
          {editMode ? (
            <FileInput multiple={true} onChange={fileInputOnChange} />
          ) : null}
        </div>
        <div className={styles.middle}>
          <h6>Personal</h6>
          <div className={styles.point_wrapper}></div>
          <h6>Contacts</h6>
          <div className={styles.point_wrapper}></div>
          <h6>Address</h6>
          <div className={styles.point_wrapper}></div>
        </div>
        <div className={styles.right}></div>
      </div>
    </Container>
  );
}
