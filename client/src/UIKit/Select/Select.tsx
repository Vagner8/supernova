import { EventsState } from 'admin/Events/eventsReducer';
import { MouseEvent } from 'react';
import { Icon, ButtonLi } from 'UIKit';
import styles from './select.module.css';

interface SelectProps {
  popup: EventsState['popup'];
  title: string;
  selectList: string[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Select({ popup, title, selectList, onClick }: SelectProps) {
  return (
    <div className={styles.Select}>
      <div className={styles.input_wrap}>
        <button data-popup={title} className={styles.input_btn}>
          <span>{title}</span>
          <input type="text" readOnly={true} />
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
