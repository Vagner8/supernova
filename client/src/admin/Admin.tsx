import React, { lazy, Suspense, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { adminInitState, adminReducer } from './adminReducer';

const Home = lazy(() => import('./Home/Home'));
const Settings = lazy(() => import('./Settings/Settings'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);

  if (!localStorage.getItem('ownerId')) {
    return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  }

  return (
    <Suspense fallback={'Preloader'}>
      <Routes>
        <Route index element={<Home adminDispatch={adminDispatch} />} />
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
  );
}
