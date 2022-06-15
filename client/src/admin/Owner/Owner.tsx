import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { UrlAddress } from 'api/fetcher';
import { useEventsList } from 'hooks';
import { Dispatch, useEffect, useMemo } from 'react';
import { Profile } from 'UIKit';
import styles from './owner.module.css';
import { fetchAndSavePoints } from './ownerApi';

interface OwnerProps {
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  errorField?: OperationResult['field'];
  errorMessage?: OperationResult['message'];
}

export default function Owner({
  errorMessage,
  points,
  adminDispatch,
  eventsDispatch,
  eventsList,
  errorField,
}: OwnerProps) {

  useEffect(() => {
    fetchAndSavePoints({
      eventsDispatch,
      adminDispatch,
      url: UrlAddress.Owner,
    });
  }, [adminDispatch, eventsDispatch]);

  useEventsList({
    eventsDispatch,
    newEventsList: useMemo(() => [EventNames.Edit], [])
  });

  return (
    <div className={styles.Owner}>
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
