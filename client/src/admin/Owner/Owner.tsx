import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { UrlAddress } from 'api/fetcher';
import { useEventsList } from 'hooks';
import { Dispatch, useMemo } from 'react';
import { Profile } from 'UIKit';
import styles from './owner.module.css';

interface OwnerProps {
  eventsList: EventsState['eventsList'];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  points: EventsState['points'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Owner({
  eventsList,
  errorField,
  errorMessage,
  points,
  adminDispatch,
  eventsDispatch,
}: OwnerProps) {
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
        url={UrlAddress.Owner}
        adminDispatch={adminDispatch}
        eventsDispatch={eventsDispatch}
      />
    </div>
  );
}
