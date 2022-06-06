import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  EventsStrAction,
  saveChangedFormName,
  saveFiles,
  showSaveEvent,
} from 'admin/Events/eventsReducer';
import { useCopyInputValues } from 'hooks';
import { useUpdateData, useEventsList } from 'hooks';
import {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { Avatar, Container, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { fetchAndSaveOwnerPII } from './profileApi';
import {
  OwnerPIIKeys,
  profileInitState,
  profileReducer,
  ProfileState,
  saveProfileInputsOutputs,
} from './profileReducer';

interface ProfileProps {
  selectedEvent: EventsState['selectedEvent'];
  eventsList: EventsState['eventsList'];
  files: EventsState['files'];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  copyInputValues: ProfileState['ownerPII'];
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export default function Profile({
  selectedEvent,
  errorField,
  errorMessage,
  copyInputValues,
  eventsList,
  files,
  adminDispatch,
  eventsDispatch,
}: ProfileProps) {
  console.log('Profile');
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitState,
  );

  let count = 0;

  useEffect(() => {
    fetchAndSaveOwnerPII(profileDispatch, adminDispatch);
  }, [adminDispatch]);

  useEventsList({
    eventsList: [EventNames.Edit],
    isEventsListExist: Boolean(eventsList.length),
    eventsDispatch,
  });

  useCopyInputValues({
    copyInputValues,
    inputValues: profileState.ownerPII,
    selectedEvent,
    eventsDispatch,
    profileDispatch,
  });

  useUpdateData({
    selectedEvent,
    ownerPII: profileState.ownerPII,
    files,
    adminDispatch,
    eventsDispatch,
  });

  const inputsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      if (!e.target.dataset.formName) return;
      const { name, value } = e.target;
      const formName = e.target.dataset.formName as OwnerPIIKeys;
      saveProfileInputsOutputs(profileDispatch, name, value, formName);
      saveChangedFormName(eventsDispatch, formName)
      if (count !== 0) return;
      count++;
      showSaveEvent(eventsDispatch, true);
    },
    [eventsDispatch, count],
  );

  const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    saveFiles(eventsDispatch, Array.from(e.target.files));
    e.target.value = '';
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
