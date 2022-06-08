import { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
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
import { FilesSheet } from './FilesSheet/FilesSheet';
import { storeOwnerCommonData } from './adminApi';
import { Events } from './Events/Events';

const Home = lazy(() => import('./Home/Home'));
const Profile = lazy(() => import('./Profile/Profile'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );

  if (!localStorage.getItem('ownerId')) {
    return <Auth adminState={adminState} adminDispatch={adminDispatch} />;
  }

  return (
    <AdminRoutes
      adminState={adminState}
      adminDispatch={adminDispatch}
      eventsState={eventsState}
      eventsDispatch={eventsDispatch}
    />
  );
}

interface AdminRoutesProps {
  adminState: AdminState;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsState: EventsState;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

function AdminRoutes({
  adminState,
  adminDispatch,
  eventsState,
  eventsDispatch,
}: AdminRoutesProps) {

  useEffect(() => {
    storeOwnerCommonData(adminDispatch);
  }, [adminDispatch]);

  return (
    <>
      <Linear show={adminState.isFetching} />
      <Events
        eventsList={eventsState.eventsList}
        selectedEvent={eventsState.selectedEvent}
        eventsDispatch={eventsDispatch}
      />
      <Navbar
        login={adminState.login}
        avatar={adminState.avatar}
      />
      <Suspense fallback={<Linear show={true} />}>
        <Routes>
          <Route
            index
            element={
              <Home eventsState={eventsState} adminDispatch={adminDispatch} />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                selectedEvent={eventsState.selectedEvent}
                eventsList={eventsState.eventsList}
                errorField={adminState.operationResult?.field}
                errorMessage={adminState.operationResult?.message}
                copyInputValues={eventsState.copyInputValues}
                files={eventsState.files}
                changedPoints={eventsState.changedPoints}
                adminDispatch={adminDispatch}
                eventsDispatch={eventsDispatch}
              />
            }
          />
        </Routes>
      </Suspense>
      <FilesSheet files={eventsState.files} eventsDispatch={eventsDispatch} />
      <Snackbar
        status={adminState.operationResult?.status}
        message={adminState.operationResult?.message}
        filed={adminState.operationResult?.field}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
