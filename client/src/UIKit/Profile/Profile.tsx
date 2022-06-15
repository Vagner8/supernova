import { AdminReducerActions, OperationResult } from 'admin/adminReducer';
import {
  EventNames,
  EventsReducerActions,
  EventsState,
  pointsOnChange,
  saveFiles,
  switchSaveEvent,
} from 'admin/Events/eventsReducer';
import { UrlAddress } from 'api/fetcher';
import { ChangeEvent, Dispatch, useCallback, useEffect } from 'react';
import { Avatar, FileInput, Form } from 'UIKit';
import styles from './profile.module.css';
import { fetchAndSavePoints } from '../../admin/Owner/ownerApi';
import { ImgUrlsType } from '../../../../common/src/commonTypes';

interface ProfileProps {
  eventsList: EventsState['eventsList'];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  points: EventsState['points'];
  url: UrlAddress;
  adminDispatch: Dispatch<AdminReducerActions>;
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function Profile({
  errorField,
  errorMessage,
  eventsList,
  points,
  url,
  adminDispatch,
  eventsDispatch,
}: ProfileProps) {

  useEffect(() => {
    fetchAndSavePoints({
      eventsDispatch,
      adminDispatch,
      url,
    });
  }, [adminDispatch, eventsDispatch, url]);

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
      fileInputName: e.target.name as keyof ImgUrlsType,
    });
    e.target.value = '';
  };

  if (!points) return null;
  const { personal, imgUrls } = points;
  return (
    <div className={styles.Profile}>
      <div className={styles.lift}>
        <Avatar url={imgUrls.avatar[0]} size="m" />
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
