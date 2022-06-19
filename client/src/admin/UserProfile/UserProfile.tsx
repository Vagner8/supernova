import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsReducer';
import { useFetchUserById } from 'api/users/useFetchUserById';
import { Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from 'UIKit';
import { UserStatus, UserType } from './../../../../common/src/userTypes';
import styles from './userProfile.module.css';

export const newUser: Omit<UserType, '_id' | 'refreshToken'> = {
  userId: 'new',
  configs: {
    login: '',
    password: '',
    rule: UserStatus.New,
  },
  personal: {
    name: '',
    surname: '',
  },
  contacts: {
    email: '',
    phone: '',
  },
  address: {
    city: '',
    zip: '',
    street: '',
    number: '',
  },
  imgs: {
    avatar: [],
    photos: [],
  },
};

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
