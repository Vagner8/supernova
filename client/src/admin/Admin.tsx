import React, { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import {
  adminInitState,
  adminReducer,
  AdminReducerActions,
  AdminState,
  AdminStrAction,
} from './adminReducer';
import { Linear, Navbar, Snackbar } from 'UIKit';
import { API, fetcher } from 'api/fetcher';
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

const Home = lazy(() => import('./Home/Home'));
const Profile = lazy(() => import('./Profile/Profile'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );
  const [filesState, filesDispatch] = useReducer(filesReducer, filesInitState);

  // useEffect(() => {
  //   const fetchOwner = async () => {
  //     const url = `${API.Owner}/?ownerId=${localStorage.getItem('ownerId')}`;
  //     const response = await fetcher<Owner>('GET', url, adminDispatch);
  //     if (!response || 'logout' in response) {
  //       return adminDispatch({
  //         type: AdminStrAction.SaveError,
  //         payload: { error: response },
  //       });
  //     }
  //     adminDispatch({ type: AdminStrAction.SaveOwner, payload: response });
  //     adminDispatch({
  //       type: AdminStrAction.SaveEventResult,
  //       payload: {
  //         eventResult: { status: 'ok', message: 'Success data uploaded' },
  //       },
  //     });
  //   };
  //   fetchOwner();
  // }, [adminDispatch]);

  if (!localStorage.getItem('ownerId')) {
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

  return (
    <>
      <Linear show={adminState.isFetching} />
      <Snackbar
        eventResult={adminState.eventResult}
        adminDispatch={adminDispatch}
      />
      <Linear show={adminState.isFetching} />
      <Navbar
        events={eventsState.events}
        editMode={eventsState.editMode}
        dependentState={eventsState.dependentState}
        saveButton={eventsState.saveButton}
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
