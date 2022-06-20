import { Dispatch, lazy, Suspense, useReducer } from 'react';
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
import { useWindowClick, useOperationResultWithField, useLocalStorageData } from 'hooks';
import { useFetchAvatarAndLogin } from 'api/users/useFetchAvatarAndLogin';

const Home = lazy(() => import('./Home/Home'));
const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
const UsersTable = lazy(() => import('./UsersTable/UsersTable'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );
  const operationResultWithField = useOperationResultWithField(
    adminState.operationResults,
  );
  const adminId = localStorage.getItem('adminId')
  if (!adminId || adminId === 'undefined') {
    return (
      <Auth
        isFetching={adminState.isFetching}
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
        errorMessage={operationResultWithField?.errorMessage}
        errorField={operationResultWithField?.errorField}
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
  console.log('AdminRoutes')
  useFetchAvatarAndLogin(adminDispatch)
  useWindowClick({ adminDispatch, drawer: adminState.drawer });
  const operationResultWithField = useOperationResultWithField(
    adminState.operationResults,
  );
  return (
    <>
      <Linear show={adminState.isFetching} />
      <Events
        editMode={eventsState.editMode}
        saveButton={eventsState.saveButton}
        eventsList={eventsState.eventsList}
        changedPoints={eventsState.changedPoints}
        files={eventsState.files}
        fileInputName={eventsState.fileInputName}
        isFileInputMultiple={eventsState.isFileInputMultiple}
        adminDispatch={adminDispatch}
        eventsDispatch={eventsDispatch}
      />
      <Navbar
        adminLogin={adminState.adminLogin}
        adminAvatar={adminState.adminAvatar}
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
              path="/users"
              element={
                <UsersTable
                  eventsList={eventsState.eventsList}
                  eventsDispatch={eventsDispatch}
                />
              }
            />
            <Route
              path="/users/:userId"
              element={
                <UserProfile
                  isFetching={adminState.isFetching}
                  editMode={eventsState.editMode}
                  points={eventsState.points}
                  eventsDispatch={eventsDispatch}
                  adminDispatch={adminDispatch}
                  errorField={operationResultWithField?.errorField}
                  errorMessage={operationResultWithField?.errorMessage}
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
