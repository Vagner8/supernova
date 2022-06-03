import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
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
import { useCopyInputValues } from 'hooks';
import {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { Avatar, Container, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { storeOwnerPII } from './profileApi';
import {
  OwnerPIIKeys,
  profileInitState,
  profileReducer,
  ProfileState,
  ProfileStrAction,
} from './profileReducer';

interface ProfileProps {
  selectedEvent: EventsState['selectedEvent'];
  eventsList: EventsState['eventsList'];
  files: FilesState['files'];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  copyInputValues: ProfileState['ownerPII'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>;
}

export default function Profile({
  selectedEvent,
  errorField,
  errorMessage,
  copyInputValues,
  eventsList,
  adminDispatch,
  eventsDispatch,
  filesDispatch,
}: ProfileProps) {
  console.log('Profile');
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitState,
  );

  // const count = useRef(0)
  let count = 0;

  useEffect(() => {
    storeOwnerPII(profileDispatch, adminDispatch);
  }, [adminDispatch]);

  useEffect(() => {
    eventsDispatch({
      type: EventsStrAction.SaveEventsList,
      payload: { eventsList: [EventNames.Edit, EventNames.Delete] },
    });
  }, [eventsDispatch]);

  useEffect(() => {
    if (selectedEvent === EventNames.EditOff && copyInputValues) {
      profileDispatch({
        type: ProfileStrAction.SaveOwnerPII,
        payload: {
          ownerPII: copyInputValues,
        },
      });
    }
  }, [copyInputValues, eventsDispatch, selectedEvent]);

  useCopyInputValues({
    copyInputValues,
    InputValues: profileState.ownerPII,
    eventsDispatch,
  });

  const inputsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
      if (count !== 0) return;
      count++;
      eventsDispatch({
        type: EventsStrAction.SaveSelectedEvent,
        payload: { selectedEvent: EventNames.Save },
      });
    },
    [eventsDispatch, count],
  );

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
            {personal.name || '-'} {personal.surname || '-'}
          </h6>
          {eventsList.includes(EventNames.EditOff) ? (
            <FileInput multiple={true} onChange={fileInputOnChange} />
          ) : null}
        </div>
        <div className={styles.middle}>
          <Form
            showInputs={eventsList.includes(EventNames.EditOff)}
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
