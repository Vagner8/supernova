import React, { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import {
  adminInitState,
  adminReducer,
  AdminReducerActions,
  AdminState,
} from './adminReducer';
import { Linear, Navbar, Snackbar } from 'UIKit';
import {
  eventsInitState,
  eventsReducer,
  EventsReducerActions,
  EventsState,
} from './Events/eventsReducer';
import {
  filesInitState,
  filesReducer,
  FilesReducerActions,
  FilesState,
} from './filesReducer';
import { FilesSheet } from './FilesSheet/FilesSheet';
import { storeOwnerCommonData } from './adminApi';

const Home = lazy(() => import('./Home/Home'));
const Profile = lazy(() => import('./Profile/Profile'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );
  const [filesState, filesDispatch] = useReducer(filesReducer, filesInitState);

  // if (!localStorage.getItem('ownerId') || adminState.fetchResult?.logout) {
  //   return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  // }
  if (adminState.fetchResult?.logout) {
    return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  }
  return (
    <AdminRoutes
      adminState={adminState}
      adminDispatch={adminDispatch}
      eventsState={eventsState}
      eventsDispatch={eventsDispatch}
      filesState={filesState}
      filesDispatch={filesDispatch}
    />
  );
}

interface AdminRoutesProps {
  adminState: AdminState;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsState: EventsState;
  eventsDispatch: Dispatch<EventsReducerActions>;
  filesState: FilesState;
  filesDispatch: Dispatch<FilesReducerActions>;
}

function AdminRoutes({
  adminState,
  adminDispatch,
  eventsState,
  eventsDispatch,
  filesState,
  filesDispatch,
}: AdminRoutesProps) {
  console.log('AdminRoutesProps');

  useEffect(() => {
    storeOwnerCommonData(adminDispatch)
  }, [adminDispatch]);

  return (
    <>
      <Linear show={adminState.isFetching} />
      <Snackbar
        status={adminState.fetchResult?.status}
        message={adminState.fetchResult?.message}
        filed={adminState.fetchResult?.field}
        adminDispatch={adminDispatch}
      />
      <Linear show={adminState.isFetching} />
      <Navbar
        events={eventsState.events}
        editMode={eventsState.editMode}
        dependentState={eventsState.dependentState}
        saveButton={eventsState.saveButton}
        login={adminState.login}
        avatar={adminState.avatar}
        adminDispatch={adminDispatch}
        eventsDispatch={eventsDispatch}
        filesDispatch={filesDispatch}
      />
      <Suspense fallback={<Linear show={true} />}>
        <Routes>
          <Route index element={<Home adminDispatch={adminDispatch} />} />
          <Route
            path="/profile"
            element={
              <Profile
                files={filesState.files}
                editMode={eventsState.editMode}
                errorField={adminState.fetchResult?.field}
                errorMessage={adminState.fetchResult?.message}
                adminDispatch={adminDispatch}
                eventsDispatch={eventsDispatch}
                filesDispatch={filesDispatch}
              />
            }
          />
        </Routes>
      </Suspense>
      <FilesSheet files={filesState.files} filesDispatch={filesDispatch} />
    </>
  );
}
