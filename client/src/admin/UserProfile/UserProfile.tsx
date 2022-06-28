import {
  AdminReducerActions,
  AdminState,
} from 'admin/adminReducer';
import {
  EventsReducerActions,
  EventsState,
} from 'admin/Events/eventsReducer';
import { useFetchUserById } from 'api/users/useFetchUserById';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import { OperationResultType } from '../../../../common/src/operationResultType';
import styles from './userProfile.module.css';

interface UserProfileProps {
  popup: EventsState['popup']
  editMode: EventsState['editMode'];
  points: EventsState['points'];
  isFetching: AdminState['isFetching'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export default function UserProfile({
  popup,
  isFetching,
  points,
  editMode,
  adminDispatch,
  eventsDispatch,
  validateErrors
}: UserProfileProps) {
  const { userId } = useParams();
  useFetchUserById(userId, eventsDispatch, adminDispatch);

  return (
    <div className={styles.UserProfile}>
      <Profile
        popup={popup}
        pointsSort={['personal', 'credentials', 'contacts', 'address']}
        isFetching={isFetching}
        editMode={editMode}
        validateErrors={validateErrors}
        points={points}
        eventsDispatch={eventsDispatch}
        adminDispatch={adminDispatch}
      />
    </div>
  );
}
