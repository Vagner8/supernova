import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  switchEditAndEditOf,
} from 'admin/Events/eventsReducer';
import { useFetchUserById } from 'api/users/useFetchUserById';
import { useEventsList } from 'hooks';
import { Dispatch, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import styles from './userProfile.module.css';

interface UserProfileProps {
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  errorField?: OperationResult['field'];
  errorMessage?: OperationResult['message'];
}

export default function UserProfile({
  errorMessage,
  points,
  adminDispatch,
  eventsDispatch,
  eventsList,
  errorField,
}: UserProfileProps) {
  const { userId } = useParams();
  useFetchUserById(userId, eventsDispatch, adminDispatch);
  useEventsList({
    eventsDispatch,
    newEventsList: useRef([EventNames.New, EventNames.Edit, EventNames.Delete])
      .current,
  });
  useEffect(() => {
    if (userId === 'new') {
      switchEditAndEditOf(eventsDispatch, EventNames.EditOff);
    }
  }, [eventsDispatch, userId])
  return (
    <div className={styles.UserProfile}>
      <Profile
        eventsList={eventsList}
        errorField={errorField}
        errorMessage={errorMessage}
        points={points}
        eventsDispatch={eventsDispatch}
      />
    </div>
  );
}
