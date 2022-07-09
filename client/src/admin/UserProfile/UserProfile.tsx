import { AdminReducerActions, AdminState } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useFetchUserById } from 'api/users/useFetchUserById';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import { OperationResultType } from '../../../../common/src/operationResultType';
import styles from './userProfile.module.css';

interface UserProfileProps {
  popup: EventsState['popup'];
  editMode: EventsState['editMode'];
  profile: EventsState['profile'];
  isFetching: AdminState['isFetching'];
  isCopyProfile: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export default function UserProfile({
  popup,
  isFetching,
  profile,
  editMode,
  isCopyProfile,
  adminDispatch,
  eventsDispatch,
  validateErrors,
}: UserProfileProps) {
  const { userId } = useParams();
  useFetchUserById(userId, eventsDispatch, adminDispatch);
  return (
    <div className={styles.UserProfile}>
      <Profile
        isCopyProfile={isCopyProfile}
        popup={popup}
        pointsSort={['personal', 'secret', 'settings', 'contacts', 'address']}
        isFetching={isFetching}
        editMode={editMode}
        validateErrors={validateErrors}
        profile={profile}
        eventsDispatch={eventsDispatch}
        adminDispatch={adminDispatch}
      />
    </div>
  );
}
