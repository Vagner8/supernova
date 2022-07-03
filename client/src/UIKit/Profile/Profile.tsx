import {
  AdminReducerActions,
  AdminState,
} from 'admin/adminReducer';
import {
  EventsReducerActions,
  EventsState,
  FileInputName,
} from 'admin/Events/eventsReducer';
import { ChangeEvent, Dispatch, useCallback, useEffect } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { UserKeyPoints } from '../../../../common/src/userTypes';
import { useAdminDispatch, useEventsDispatch } from 'hooks';
import { useSplitParams } from 'admin/Events/eventsHooks.ts/useSplitParams';

interface ProfileProps {
  popup: EventsState['popup'];
  pointsSort: UserKeyPoints[];
  editMode: EventsState['editMode'];
  points: EventsState['points'];
  isFetching: AdminState['isFetching'];
  isCopyPoints: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Profile({
  popup,
  pointsSort,
  isFetching,
  points,
  editMode,
  isCopyPoints,
  eventsDispatch,
  adminDispatch,
  validateErrors,
}: ProfileProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  const { idParam } = useSplitParams();

  useEffect(() => {
    if (idParam === 'new') eventsAction.switchEditMode(true)
  }, [isCopyPoints, eventsAction, idParam]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      adminAction.deleteAllOperationResults();
      if (!isCopyPoints) eventsAction.saveCopyOfPoints();
      eventsAction.pointsOnChange({
        name: e.target.name,
        value: e.target.value,
        pointName: e.target.dataset.pointName as keyof EventsState['points'],
      });
    },
    [adminAction, eventsAction, isCopyPoints],
  );

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    eventsAction.saveFiles({
      files: Array.from(e.target.files || []),
      isFileInputMultiple: e.target.multiple,
      fileInputName: e.target.name as FileInputName,
    });
    e.target.value = '';
  };

  if (!points || isFetching) return null;
  const { personal, imgs } = points;
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
          points={points}
          onChange={onChange}
          eventsDispatch={eventsDispatch}
          validateErrors={validateErrors}
        />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
