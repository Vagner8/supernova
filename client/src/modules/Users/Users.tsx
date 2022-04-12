import { useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Header } from './Header/Header';
import {
  profileInitState,
  profileReducer,
} from './reducers/profileReducer/profileReducer';
import { usersInitState, usersReducer } from './reducers/usersReducer';
import { UseUserContext } from './types';
import styles from './Users.module.sass';

export function Users() {
  const [usersState, usersDispatch] = useReducer(usersReducer, usersInitState);
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitState,
  );
  return (
    <div className={styles.Users}>
      <Header
        dropdownList={usersState.dropdownList}
        usersDispatch={usersDispatch}
        profileDispatch={profileDispatch}
        profileState={profileState}
      />
      <Outlet
        context={{
          usersDispatch,
          profileDispatch,
          usersState,
          profileState,
        }}
      />
    </div>
  );
}

export function useUserContext() {
  return useOutletContext<UseUserContext>();
}
