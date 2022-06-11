import { EventNames } from 'admin/Events/eventsReducer';
import { MouseEvent, useEffect, useState } from 'react';
import { Icon } from 'UIKit';
import styles from './dropdown.module.css';

interface DropdownProps {
  title: string;
  list: string[] | null;
  handleEvents: (target: HTMLButtonElement) => void;
}

export function Dropdown({ title, list, handleEvents }: DropdownProps) {
  const [show, setSow] = useState(false);

  useEffect(() => {
    function onClickDocument(this: HTMLElement, e: Event) {
      if (!e.target) return;
      if ((e.target as HTMLElement).closest('.dropdown_Dropdown__rppfE')) {
        return;
      }
      setSow(false);
    }
    document.addEventListener('click', onClickDocument);
    return () => document.removeEventListener('click', onClickDocument);
  }, []);

  const dropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSow(true);
  };

  const buttonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSow(false);
    if (!e.target) return;
    const target = e.target as HTMLButtonElement;
    handleEvents(target);
  };

  if (!list) return null;

  return (
    <div className={styles.Dropdown}>
      <button onClick={dropdownClick} className={styles.button}>
        {title}
      </button>
      {show ? (
        <ul className={styles.list}>
          {list.map((item) => {
            if (!item) return
            return (
              <li key={item}>
                <button
                  data-event-name={item}
                  className={styles.li_button}
                  onClick={buttonClick}
                >
                  {item}
                  {item === EventNames.Save ? (
                    <Icon className={styles.ikon} icon="save" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
