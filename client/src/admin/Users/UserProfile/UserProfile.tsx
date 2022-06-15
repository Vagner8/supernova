import { OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { useEventsList } from 'hooks';
import { Dispatch, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import styles from './userProfile.module.css';

interface UserProfileProps {
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  errorField?: OperationResult['field'];
  errorMessage?: OperationResult['message'];
}

export function UserProfile({
  eventsList,
  points,
  eventsDispatch,
  errorField,
  errorMessage,
}: UserProfileProps) {
  const { userId } = useParams();
  useEventsList({
    eventsDispatch,
    newEventsList: useMemo(
      () => [EventNames.New, EventNames.Edit, EventNames.Delete],
      [],
    ),
  });
  useEffect(() => {}, []);
  return (
    <div className={styles.UserProfile}>
      <h1>UserProfile</h1>
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
