import { OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  pointsOnChange,
  saveFiles,
  switchSaveEvent,
} from 'admin/Events/eventsReducer';
import { ChangeEvent, Dispatch, useCallback } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { ImgsType } from '../../../../common/src/commonTypes';

interface ProfileProps {
  eventsList: EventsState['eventsList'];
  points: EventsState['points'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  errorField?: OperationResult['field'];
  errorMessage?: OperationResult['message'];
}

export function Profile({
  eventsList,
  points,
  eventsDispatch,
  errorField,
  errorMessage,
}: ProfileProps) {

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      pointsOnChange({
        eventsDispatch,
        name: e.target.name,
        value: e.target.value,
        pointName: e.target.dataset.pointName as keyof EventsState['points'],
      });
      switchSaveEvent(eventsDispatch, 'show');
    },
    [eventsDispatch],
  );

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    saveFiles({
      eventsDispatch,
      files: Array.from(e.target.files || []),
      isFileInputMultiple: e.target.multiple,
      fileInputName: e.target.name as keyof ImgsType,
    });
    e.target.value = '';
  };

  if (!points) return null;
  const { personal, imgs } = points;
  return (
    <div className={styles.Profile}>
      <div className={styles.lift}>
        <Avatar url={imgs.avatar[0]} size="m" />
        <h6>
          {personal.name || '-'} {personal.surname || '-'}
        </h6>
        {eventsList?.includes(EventNames.EditOff) ? (
          <FileInput name="avatar" multiple={false} onChange={onChangeFiles} />
        ) : null}
      </div>
      <div className={styles.middle}>
        <Form
          hideInput={eventsList?.includes(EventNames.Edit)}
          points={points}
          onChange={onChange}
          errorField={errorField}
          errorMessage={errorMessage}
          sort={['personal', 'contacts', 'address']}
        />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
