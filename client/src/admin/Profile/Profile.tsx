import { AdminReducerActions, FetchResult } from 'admin/adminReducer';
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
import { ChangeEvent, Dispatch, useCallback, useEffect, useReducer } from 'react';
import { Avatar, Container, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { storeOwnerPII } from './profileApi';
import {
  OwnerPIIKeys,
  profileInitState,
  profileReducer,
  ProfileStrAction,
} from './profileReducer';

interface ProfileProps {
  editMode: EventsState['editMode'];
  files: FilesState['files'];
  errorField: FetchResult['field'] | undefined;
  errorMessage: FetchResult['message'] | undefined;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>;
}

export default function Profile({
  editMode,
  errorField,
  errorMessage,
  adminDispatch,
  eventsDispatch,
  filesDispatch,
}: ProfileProps) {
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitState,
  );

  useEffect(() => {
    storeOwnerPII(profileDispatch, adminDispatch);
    eventsDispatch({
      type: EventsStrAction.SaveEvents,
      payload: { events: [EventNames.Edit] },
    });
    eventsDispatch({
      type: EventsStrAction.SetDependentState,
      payload: { stateName: 'adminState' },
    });
  }, [profileDispatch, adminDispatch, eventsDispatch]);

  const inputsOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    if (!e.target.dataset.formName) return;
    const { name, value } = e.target;
    profileDispatch({
      type: ProfileStrAction.SaveInputsOutputs,
      payload: {
        name,
        value,
        formName: e.target.dataset.formName as OwnerPIIKeys,
      },
    });
  }, [])

  const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    filesDispatch({
      type: FilesStrAction.SaveFiles,
      payload: { files: Array.from(e.target.files) },
    });
  };

  if (!profileState.ownerPII) return null;

  const { personal } = profileState.ownerPII;

  return (
    <Container>
      <div className={styles.Profile}>
        <div className={styles.lift}>
          <Avatar url={personal.avatar} size="m" />
          <h6>
            {personal.name || 'empty'} {personal.surname || 'empty'}
          </h6>
          {editMode ? (
            <FileInput multiple={true} onChange={fileInputOnChange} />
          ) : null}
        </div>
        <div className={styles.middle}>
          <Form
            editMode={editMode}
            data={profileState.ownerPII}
            inputsOnChange={inputsOnChange}
            errorField={errorField}
            errorMessage={errorMessage}
            sort={['personal', 'contacts', 'address']}
          />
        </div>
        <div className={styles.right}></div>
      </div>
    </Container>
  );
}
