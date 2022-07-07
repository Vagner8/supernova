import { AdminReducerActions, AdminState } from 'admin/adminReducer';
import { EventsReducerActions, EventsState, FileInputName } from 'admin/Events/eventsState';
import { ChangeEvent, Dispatch, useCallback } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { UserProfileKeys } from '../../../../common/src/userTypes';
import { useAdminDispatch, useEventsDispatch, useSplitParams } from 'hooks';
import { useProfile } from './useProfile';

interface ProfileProps {
  popup: EventsState['popup'];
  pointsSort: UserProfileKeys[];
  editMode: EventsState['editMode'];
  profile: EventsState['profile'];
  isFetching: AdminState['isFetching'];
  isCopyProfile: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Profile({
  popup,
  pointsSort,
  isFetching,
  profile,
  editMode,
  isCopyProfile,
  eventsDispatch,
  adminDispatch,
  validateErrors,
}: ProfileProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  const { idParam } = useSplitParams();
  useProfile(eventsDispatch);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      adminAction.deleteAllOperationResults();
      if (!isCopyProfile) eventsAction.saveProfileCopy();
      eventsAction.profileOnChange({
        name: e.target.name,
        value: e.target.value,
        pointName: e.target.dataset.pointName as keyof EventsState['profile'],
      });
    },
    [adminAction, eventsAction, isCopyProfile],
  );

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    eventsAction.saveFiles({
      files: Array.from(e.target.files || []),
      isFileInputMultiple: e.target.multiple,
      fileInputName: e.target.name as FileInputName,
    });
    e.target.value = '';
  };

  if (!profile || isFetching) return null;
  const { personal, imgs } = profile;
  return (
    <div className={styles.Profile}>
      <div className={styles.lift}>
        <Avatar url={imgs.avatar[0]} size="m" />
        <h5>
          {personal.name || '-'} {personal.surname || '-'}
        </h5>
        {editMode && idParam !== 'new' ? (
          <FileInput name="avatar" multiple={true} onChange={onChangeFiles} />
        ) : null}
      </div>
      <div className={styles.middle}>
        <Form
          popup={popup}
          pointsSort={pointsSort}
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
