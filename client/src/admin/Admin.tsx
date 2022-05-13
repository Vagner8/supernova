import React, { lazy, Suspense, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { usersInitState, usersReducer } from './Users/usersState/usersReducer';
import styles from './Admin.module.sass';
import { DropListActionType, Todo } from './Users/usersState/usersTypes';
import { ClickHandler } from '../share/shareTypes';
import { Auth } from './Auth/Auth';

const Home = lazy(() => import('./Home/Home'));
const Settings = lazy(() => import('./Settings/Settings'));
// const Users = lazy(() => import('./Users/Users'));

export interface Owner {
  name: string;
  ownerId: string;
}

export function Admin() {
  const [usersState, usersDispatch] = useReducer(usersReducer, usersInitState);
  const [owner, setOwner] = useState<Owner>({
    name: '',
    ownerId: '',
  })

  function setDropItemTitle(todo: string): string {
    if (todo === Todo.Edit) {
      return usersState.editMode ? 'edit off' : 'edit on';
    }
    return todo;
  }

  const onClickDropdown: ClickHandler = ({ target }) => {
    const { id } = target as HTMLButtonElement;
    if (id) {
      usersDispatch({
        type: DropListActionType.ToggleEditMode,
        payload: { id },
      });
    }
  };

  if (!owner.ownerId) return <Auth setOwner={setOwner}/>

  return (
    <div className="Admin_Component">
      <div className={styles.Admin_Component}>
        <Suspense fallback={'<Preloader />'}>
          <Routes>
            <Route path="admin/home" element={<Home />} />
            {/* <Route
              path="admin/users"
              element={
                <Users usersState={usersState} usersDispatch={usersDispatch} />
              }
            /> */}
            {/* <Route
              path="admin/profile/:userId"
              element={(
                <Profile
                  usersState={usersState}
                  usersDispatch={usersDispatch}
                />
              )}
            /> */}
            <Route path="admin/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
