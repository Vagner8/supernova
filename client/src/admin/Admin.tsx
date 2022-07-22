import { Dispatch, lazy, Suspense, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { adminInitState, adminReducer } from './adminState/adminReducer';
import { Container, Drawer, Linear, Navbar } from 'UIKit';
import { MemoFilesSheet } from './FilesSheet/FilesSheet';
import { Events } from './Events/Events';
import { OperationResultsSheet } from './OperationResultsSheet/OperationResultsSheet';
import { useEventsSelector, useValidateErrors, useWindowClick } from 'hooks';
import { useFetchAvatarAndLogin } from 'api/users/useFetchAvatarAndLogin';
import {
  eventsInitState,
  eventsReducer,
  EventsReducerActions,
  EventsState,
} from './Events/eventsState';
import { AdminReducerActions, AdminState } from './adminState';

const Home = lazy(() => import('./Home/Home'));
const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
const UsersTable = lazy(() => import('./UsersTable/UsersTable'));
const ProductProfile = lazy(() => import('./ProductProfile/ProductProfile'));
const ProductTable = lazy(() => import('./ProductTable/ProductTable'));

export function Admin() {
  const [adminState, adminDispatch] = useReducer(adminReducer, adminInitState);
  const [eventsState, eventsDispatch] = useReducer(
    eventsReducer,
    eventsInitState,
  );
  const adminId = localStorage.getItem('adminId')
  if (!adminId || adminId === 'undefined') {
    return (
      <Auth
        loginInputs={adminState.loginInputs}
        isFetching={adminState.isFetching}
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
        validateErrors={
          adminState?.operationResults?.filter((res) => res?.validateErrors)[0]
            ?.validateErrors
        }
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

export function AdminRoutes({
  adminState,
  adminDispatch,
  eventsState,
  eventsDispatch,
}: AdminRoutesProps) {
  console.log('AdminRoutes');
  useFetchAvatarAndLogin(adminDispatch);
  useWindowClick({ eventsDispatch, popup: eventsState.popup });
  const validateErrors = useValidateErrors(adminState.operationResults);
  const { selectTableRowsIds, isSomeRowSelected, isProfileCopied } =
    useEventsSelector();

  return (
    <>
      <Linear show={adminState.isFetching} />
      <Events
        popup={eventsState.popup}
        editMode={eventsState.editMode}
        eventsList={eventsState.eventsList}
        profile={eventsState.profile}
        changedProfile={eventsState.changedProfile}
        mediaFiles={eventsState.mediaFiles}
        isSomeRowSelected={isSomeRowSelected(eventsState.tableRows)}
        selectTableRowsIds={selectTableRowsIds(eventsState.tableRows)}
        adminDispatch={adminDispatch}
        eventsDispatch={eventsDispatch}
      />
      <Navbar
        adminLogin={adminState.adminLogin}
        adminAvatar={adminState.adminAvatar}
      />
      <Drawer popup={eventsState.popup} />
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
                  users={eventsState.tableRows}
                  eventsDispatch={eventsDispatch}
                  adminDispatch={adminDispatch}
                />
              }
            />
            <Route
              path="/users/:itemId"
              element={
                <UserProfile
                  popup={eventsState.popup}
                  isFetching={adminState.isFetching}
                  editMode={eventsState.editMode}
                  profile={eventsState.profile}
                  isProfileCopied={isProfileCopied(eventsState.copyProfile)}
                  eventsDispatch={eventsDispatch}
                  adminDispatch={adminDispatch}
                  validateErrors={validateErrors}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProductTable
                  products={eventsState.tableRows}
                  eventsDispatch={eventsDispatch}
                  adminDispatch={adminDispatch}
                />
              }
            />
            <Route
              path="/products/:itemId"
              element={
                <ProductProfile
                  popup={eventsState.popup}
                  isFetching={adminState.isFetching}
                  editMode={eventsState.editMode}
                  profile={eventsState.profile}
                  isProfileCopied={isProfileCopied(eventsState.copyProfile)}
                  eventsDispatch={eventsDispatch}
                  adminDispatch={adminDispatch}
                  validateErrors={validateErrors}
                />
              }
            />
          </Routes>
        </Container>
      </Suspense>
      <MemoFilesSheet
        mediaFiles={eventsState.mediaFiles}
        eventsDispatch={eventsDispatch}
      />
      <OperationResultsSheet
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
