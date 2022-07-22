import {
  EventsReducerActions,
  EventsState,
  MediaFile,
  useEventsDispatch,
} from 'admin/Events/eventsState';
import { ChangeEvent, Dispatch, useCallback } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { AdminReducerActions, AdminState, useAdminDispatch } from 'admin/adminState';
import { OperationResultType } from '../../../../common/src/commonTypes';
import { useProfile } from './profileHooks/useProfile';

interface ProfileProps {
  popup: EventsState['popup'];
  editMode: EventsState['editMode'];
  profile: EventsState['profile'];
  isFetching: AdminState['isFetching'];
  isProfileCopied: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Profile({
  popup,
  isFetching,
  profile,
  editMode,
  isProfileCopied,
  eventsDispatch,
  adminDispatch,
  validateErrors,
}: ProfileProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  useProfile(eventsDispatch);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      adminAction.setAdminState({operationResults: null});
      console.log(profile);
      if (!isProfileCopied)
        eventsAction.setEventsState({ copyProfile: profile });
      eventsAction.profileOnChange({
        name: e.target.name,
        value: e.target.value,
        pointName: e.target.dataset.pointName as keyof EventsState['profile'],
      });
    },
    [adminAction, eventsAction, isProfileCopied, profile],
  );

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    eventsAction.saveMediaFiles({
      files: Array.from(e.target.files || []),
      name: e.target.name as MediaFile['name'],
    });
    e.target.value = '';
  };

  if (!profile || isFetching) return null;
  return (
    <div className={styles.Profile}>
      <div className={styles.lift}>
        <Avatar url={profile.imgs.avatar[0]} size="m" />
        {editMode && (
          <FileInput
            className={styles.file_input}
            name="avatar"
            multiple={true}
            onChange={onChangeFiles}
          />
        )}
      </div>
      <div className={styles.middle}>
        <Form
          popup={popup}
          editMode={editMode}
          profile={profile}
          onChange={onChange}
          eventsDispatch={eventsDispatch}
          validateErrors={validateErrors}
        />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
