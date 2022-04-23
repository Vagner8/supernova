import React, { lazy, Suspense, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DropList } from '../components/DropList/DropList';
import { Menu } from '../components/Menu/Menu';
import { Preloader } from '../components/Preloader/Preloader';
import { Profile } from './Profile/Profile';
import { usersInitState, usersReducer } from './Users/usersState/usersReducer';
import styles from './Admin.module.sass';
import { DropListActionType, Todo } from './Users/usersState/usersTypes';
import { ClickHandler } from '../share/shareTypes';

const Home = lazy(() => import('./Home/Home'));
const Settings = lazy(() => import('./Settings/Settings'));
const Users = lazy(() => import('./Users/Users'));

export function Admin() {
  const [usersState, usersDispatch] = useReducer(usersReducer, usersInitState);

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

  return (
    <div className="Admin_Component">
      <div className="Admin_menu">
        <Menu />
      </div>
      <DropList
        title="Actions"
        dropList={usersState.dropList ?? []}
        onClickDropdown={onClickDropdown}
        setDropItemTitle={setDropItemTitle}
      />
      <div className={styles.Admin_Component}>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="admin" element={<Home />} />
            <Route
              path="admin/users"
              element={
                <Users usersState={usersState} usersDispatch={usersDispatch} />
              }
            />
            <Route
              path="admin/profile/:userId"
              element={(
                <Profile
                  usersState={usersState}
                  usersDispatch={usersDispatch}
                />
              )}
            />
            <Route path="admin/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
