import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useEventsDispatch } from 'hooks';
import { Dispatch, MouseEvent, useState } from 'react';
import { Icon, ButtonLi } from 'UIKit';
import { UserStatus } from '../../../../common/src/userTypes';
import styles from './select.module.css';

interface SelectProps {
  pointName: keyof EventsState['points'];
  popup: EventsState['popup'];
  value: string;
  label: string;
  selectList: UserStatus[];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function Select({
  pointName,
  popup,
  value,
  label,
  selectList,
  eventsDispatch,
}: SelectProps) {
  const [selectValue, setSelectValue] = useState(value);
  const eventsAction = useEventsDispatch(eventsDispatch);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e.target) return;
    const btnName = (e.target as HTMLButtonElement).getAttribute(
      'data-btn-name',
    );
    if (!btnName) return;
    setSelectValue(btnName);
    eventsAction.pointsOnChange({ name: label, value: btnName, pointName });
  };

  return (
    <div className={styles.Select}>
      <button type="button" data-popup={label} className={styles.input_btn}>
        <p>{selectValue}</p>
        <Icon icon="arrow_drop_down" />
      </button>
      {popup === label ? (
        <ul>
          <li className={styles.label}>{`Choose ${label}`}</li>
          {selectList.map((selectItem) => (
            <ButtonLi key={selectItem} title={selectItem} onClick={onClick} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
