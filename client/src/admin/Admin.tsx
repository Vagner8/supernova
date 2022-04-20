import React, { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
import { Outlet, Route, Routes, useOutletContext } from 'react-router-dom';
import { Menu } from '../components/Menu/Menu';
import { Preloader } from '../components/Preloader/Preloader';
import { FetchStatus, useFetch, UsersAPI } from '../hooks/useFetch';
import { Profile } from './Profile/Profile';
import { TableActionType, UsersReducerActions } from './Users/usersState/usersTypes/usersActionsTypes';
import { usersInitState, usersReducer } from './Users/usersState/usersReducer';
import {
  DropItem,
  User,
  UsersState,
} from './Users/usersState/usersTypes';

const Home = lazy(() => import('./Home/Home'));
const Settings = lazy(() => import('./Settings/Settings'));
const Users = lazy(() => import('./Users/Users'));

interface UseAdminContext {
  users: {
    state: UsersState;
    status: FetchStatus;
    dispatch: Dispatch<UsersReducerActions>;
  };
}

export function useAdminContext() {
  return useOutletContext<UseAdminContext>();
}

export function Admin() {
  const { data, status } = useFetch(UsersAPI.Users);
  const [state, dispatch] = useReducer(usersReducer, usersInitState);
  useEffect(() => {
    dispatch({
      type: TableActionType.SetData,
      payload: data as { users: User[]; dropList: DropItem[] },
    });
  }, [data]);

  return (
    <Outlet
      context={{
        users: { state, status, dispatch },
      }}
    />
  );
}

export function AdminRoutes() {
  return (
    <div className="App_Component">
      <div className="app_menu">
        <Menu />
      </div>
      <div className="app_body">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
