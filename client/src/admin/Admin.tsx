import React, { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import {
  adminInitState,
  adminReducer,
  AdminReducerActions,
  AdminState,
  AdminStrAction,
  Owner,
} from './adminReducer';
import { Linear, Navbar } from 'UIKit';
import { API, fetcher } from 'api/fetcher';

const Home = lazy(() => import('./Home/Home'));
const Profile = lazy(() => import('./Profile/Profile'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  if (!localStorage.getItem('ownerId')) {
    return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  }
  return <AdminRoutes adminState={adminState} adminDispatch={adminDispatch} />;
}

interface AdminRoutesProps {
  adminState: AdminState;
  adminDispatch: Dispatch<AdminReducerActions>;
}

function AdminRoutes({ adminState, adminDispatch }: AdminRoutesProps) {
  useEffect(() => {
    const fetchOwner = async () => {
      const url = `${API.Owner}/?ownerId=${localStorage.getItem('ownerId')}`;
      const response = await fetcher<Owner>('GET', url, adminDispatch);
      if (!response || 'logout' in response) {
        return adminDispatch({
          type: AdminStrAction.SaveError,
          payload: response,
        });
      }
      adminDispatch({ type: AdminStrAction.SaveOwner, payload: response });
    };
    fetchOwner();
  }, [adminDispatch]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Linear show={true} />}>
        <Routes>
          <Route index element={<Home adminDispatch={adminDispatch} />} />
          <Route
            path="/profile"
            element={<Profile adminState={adminState} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}
