import { Dispatch, lazy, Suspense, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import {
  adminInitState,
  adminReducer,
  AdminState,
} from './adminState/adminReducer';
import { Container, Drawer, Linear, Navbar } from 'UIKit';
import { MemoFilesSheet } from './FilesSheet/FilesSheet';
import { Events } from './Events/Events';
import { OperationResultsSheet } from './OperationResultsSheet/OperationResultsSheet';
import { useValidateErrors, useWindowClick } from 'hooks';
import { useFetchAvatarAndLogin } from 'api/users/useFetchAvatarAndLogin';
import { isCopyProfile } from 'helpers';
import {
  eventsInitState,
  eventsReducer,
  EventsReducerActions,
  EventsState,
} from './Events/eventsState';
import { AdminReducerActions } from './adminState';

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
  const adminId = localStorage.getItem('adminId');
  if (!adminId || adminId === 'undefined') {
    return (
      <Auth
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

function AdminRoutes({
  adminState,
  adminDispatch,
  eventsState,
  eventsDispatch,
}: AdminRoutesProps) {
  console.log('AdminRoutes');
  useFetchAvatarAndLogin(adminDispatch);
  useWindowClick({ eventsDispatch, popup: eventsState.popup });
  const validateErrors = useValidateErrors(adminState.operationResults);

  return (
    <>
      <Linear show={adminState.isFetching} />
      <Events
        popup={eventsState.popup}
        editMode={eventsState.editMode}
        eventsList={eventsState.eventsList}
        profile={eventsState.profile}
        changedProfile={eventsState.changedProfile}
        files={eventsState.files}
        fileInputName={eventsState.fileInputName}
        isFileInputMultiple={eventsState.isFileInputMultiple}
        isSomeRowSelected={eventsState.tableRows?.some((row) => row.selected)}
        selectedTableRows={eventsState.tableRows?.filter((row) => row.selected)}
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
              path="/users/:userId"
              element={
                <UserProfile
                  popup={eventsState.popup}
                  isFetching={adminState.isFetching}
                  editMode={eventsState.editMode}
                  profile={eventsState.profile}
                  isCopyProfile={isCopyProfile(eventsState.copyProfile)}
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
                />
              }
            />
            <Route path="/products/:productId" element={<ProductProfile />} />
          </Routes>
        </Container>
      </Suspense>
      <MemoFilesSheet
        files={eventsState.files}
        eventsDispatch={eventsDispatch}
      />
      <OperationResultsSheet
        operationResults={adminState.operationResults}
        adminDispatch={adminDispatch}
      />
    </>
  );
}
