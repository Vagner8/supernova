import React, { lazy, Suspense, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { adminInitState, adminReducer, AdminStrAction, Owner } from './adminReducer';
import { Linear, Navbar } from 'UIKit';
import { API, fetcher } from 'api/fetcher';

const Home = lazy(() => import('./Home/Home'));
const Profile = lazy(() => import('./Profile/Profile'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);

  useEffect(() => {
    const fetchOwner = async () => {
      const url = `${API.Owner}/?ownerId=${localStorage.getItem('ownerId')}`
      const res = await fetcher<Owner>('GET', url, adminDispatch)
      if (!res || 'logout' in res) {
        return adminDispatch({ type: AdminStrAction.SetErr, payload: res });
      }
    }
    fetchOwner()
  }, [])

  if (!localStorage.getItem('ownerId')) {
    return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<Linear show={true} />}>
        <Routes>
          <Route index element={<Home adminDispatch={adminDispatch} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  );
}
