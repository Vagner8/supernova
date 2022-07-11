import {
  EventsReducerActions,
  EventsState,
  FileInputName,
} from 'admin/Events/eventsState';
import { ChangeEvent, Dispatch, useCallback } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { useAdminDispatch, useEventsDispatch, useSplitParams } from 'hooks';
import { useProfile } from './useProfile';
import { AdminReducerActions, AdminState } from 'admin/adminState';
import { OperationResultType } from '../../../../common/src/commonTypes';

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
  const { idParam } = useSplitParams();
  useProfile(eventsDispatch);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      adminAction.deleteAllOperationResults();
      if (!isProfileCopied) eventsAction.saveProfileCopy();
      eventsAction.profileOnChange({
        name: e.target.name,
        value: e.target.value,
        pointName: e.target.dataset.pointName as keyof EventsState['profile'],
      });
    },
    [adminAction, eventsAction, isProfileCopied],
  );

  const onChangeFiles = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    eventsAction.saveFiles({
      files: Array.from(e.target.files || []),
      isFileInputMultiple: e.target.multiple,
      fileInputName: e.target.name as FileInputName,
    });
    e.target.value = '';
  };

  if (!profile || isFetching) return null;
  return (
    <div className={styles.Profile}>
      <div className={styles.lift}>
        <Avatar url={profile.imgs.avatar[0]} size="m" />
        {editMode && idParam !== 'new' ? (
          <FileInput name="avatar" multiple={false} onChange={onChangeFiles} />
        ) : null}
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
