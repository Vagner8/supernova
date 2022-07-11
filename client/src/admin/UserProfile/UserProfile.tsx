import { AdminReducerActions, AdminState } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import { OperationResultType } from '../../../../common/src/commonTypes';
import styles from './userProfile.module.css';
import { useUserProfile } from './useUserProfile';

interface UserProfileProps {
  popup: EventsState['popup'];
  editMode: EventsState['editMode'];
  profile: EventsState['profile'];
  isFetching: AdminState['isFetching'];
  isProfileCopied: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export default function UserProfile({
  popup,
  isFetching,
  profile,
  editMode,
  isProfileCopied,
  adminDispatch,
  eventsDispatch,
  validateErrors,
}: UserProfileProps) {
  const { userId } = useParams();
  useUserProfile({ userId, eventsDispatch, adminDispatch });
  return (
    <div className={styles.UserProfile}>
      <Profile
        isProfileCopied={isProfileCopied}
        popup={popup}
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
