import { Dispatch, lazy, Suspense, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import {
  adminInitState,
  adminReducer,
  AdminReducerActions,
  AdminState,
} from './adminReducer';
import { Container, Drawer, Linear, Navbar } from 'UIKit';
import {
  eventsInitState,
  eventsReducer,
  EventsReducerActions,
  EventsState,
} from './Events/eventsReducer';
import { FilesSheet } from './FilesSheet/FilesSheet';
import { Events } from './Events/Events';
import { OperationResultsSheet } from './OperationResultsSheet/OperationResultsSheet';
import { fetchAndSaveAvatarAndLogin } from './adminApi';
import { UrlAddress } from 'api/fetcher';
import { useWindowClick } from 'hooks/useWindowClick';

const Home = lazy(() => import('./Home/Home'));
const Owner = lazy(() => import('./Owner/Owner'));
const Users = lazy(() => import('./Users/Users'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );

  const resultWithField = () => {
    return adminState.operationResults.filter(
      (result) => typeof result.field === 'string',
    )[0];
  };

  if (!localStorage.getItem('ownerId')) {
    return (
      <Auth
        isFetching={adminState.isFetching}
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
        errorMessage={resultWithField()?.message}
        errorField={resultWithField()?.field}
      />
    );
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
    fetchAndSaveAvatarAndLogin({ adminDispatch, url: UrlAddress.Owner });
  }, [adminDispatch]);
  useWindowClick({ adminDispatch, drawer: adminState.drawer });
  return (
    <>
      <Linear show={adminState.isFetching} />
      <Events
        eventsList={eventsState.eventsList}
        changedPoints={eventsState.changedPoints}
        files={eventsState.files}
        fileInputName={eventsState.fileInputName}
        isFileInputMultiple={eventsState.isFileInputMultiple}
        adminDispatch={adminDispatch}
        eventsDispatch={eventsDispatch}
      />
      <Navbar
        ownerLogin={adminState.ownerLogin}
        ownerAvatar={adminState.ownerAvatar}
      />
      <Drawer drawer={adminState.drawer} />
      <Suspense fallback={<Linear show={true} />}>
        <Container>
          <Routes>
            <Route
              index
              element={
                <Home eventsState={eventsState} adminDispatch={adminDispatch} />
              }
            />
            <Route
              path="/owner"
              element={
                <Owner
                  eventsList={eventsState.eventsList}
                  errorField={
                    adminState.operationResults.filter(
                      (result) => result.field,
                    )[0]?.field
                  }
                  errorMessage={
                    adminState.operationResults.filter(
                      (result) => result.field,
                    )[0]?.message
                  }
                  points={eventsState.points}
                  adminDispatch={adminDispatch}
                  eventsDispatch={eventsDispatch}
                />
              }
            />
            <Route
              path="/users"
              element={
                <Users
                  eventsList={eventsState.eventsList}
                  eventsDispatch={eventsDispatch}
                />
              }
            />
          </Routes>
        </Container>
      </Suspense>
      <FilesSheet files={eventsState.files} eventsDispatch={eventsDispatch} />
      <OperationResultsSheet
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
