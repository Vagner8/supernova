import { EventsState } from 'admin/Events/eventsReducer';
import { ChangeEvent } from 'react';
import { Icon, ButtonLi } from 'UIKit';
import { UserStatus } from '../../../../common/src/userTypes';
import styles from './select.module.css';

interface SelectProps {
  popup: EventsState['popup'];
  title: string;
  selectList: UserStatus[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Select({ popup, title, selectList, onChange }: SelectProps) {
  const onClick = () => {

  }
  return (
    <div className={styles.Select}>
      <div className={styles.input_wrap}>
        <button data-popup={title} className={styles.input_btn}>
          <span>{title}</span>
          <input type="text" readOnly={true} onChange={onChange}/>
          <Icon icon="arrow_drop_down" />
        </button>
      </div>
      {popup === title ? (
        <ul>
          {selectList.map((selectItem) => (
            <ButtonLi key={selectItem} title={selectItem} onClick={onClick} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
