import {
  AdminReducerActions,
  AdminStrAction,
  Owner,
  OwnerKeys,
  OwnerNestedKeys,
} from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsStrAction,
} from 'admin/Events/eventsReducer';
import { ChangeEvent, Dispatch, Fragment, useEffect } from 'react';
import { Avatar, Container, FileInput, Input, Point } from 'UIKit';
import styles from './profile.module.css';

interface ProfileProps {
  owner: Owner | null;
  editMode: boolean;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export default function Profile({
  owner,
  editMode,
  adminDispatch,
  eventsDispatch,
}: ProfileProps) {
  
  useEffect(() => {
    eventsDispatch({
      type: EventsStrAction.SaveEvents,
      payload: { events: [EventNames.Edit] },
    });
  }, [eventsDispatch]);

  if (!owner) return null;
  const { personal } = owner;

  const onChange = (key: OwnerKeys) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const name = e.target.name as OwnerNestedKeys;
    const value = e.target.value;
    adminDispatch({
      type: AdminStrAction.SaveOwnerChanges,
      payload: {
        name,
        value,
        key,
      },
    });
  };

  const points = (obj: any, objKey: OwnerKeys) =>
    Object.entries(obj).map(([key, value]) => {
      if (key === 'avatar') return;
      return (
        <Fragment key={key}>
          {editMode ? (
            <Input
              error={null}
              label={key}
              value={value as string}
              onChange={onChange(objKey)}
              type="text"
            />
          ) : (
            <Point keyText={key} valueText={value as string} />
          )}
        </Fragment>
      );
    });

  return (
    <Container>
      <div className={styles.Profile}>
        <div className={styles.lift}>
          <Avatar url={personal.avatar} size="m" />
          <h6>
            {personal.name} {personal.surname}
          </h6>
          {editMode ? <FileInput multiple={false} title="photo" /> : null}
        </div>
        <div className={styles.middle}>
          <h6>Personal</h6>
          <div className={styles.point_wrapper}>
            {points(owner.personal, 'personal')}
          </div>
          <h6>Contacts</h6>
          <div className={styles.point_wrapper}>
            {points(owner.contacts, 'contacts')}
          </div>
          <h6>Address</h6>
          <div className={styles.point_wrapper}>
            {points(owner.address, 'address')}
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </Container>
  );
}
