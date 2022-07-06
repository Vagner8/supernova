import { EventsState } from 'admin/Events/eventsState';
import { ReactNode } from 'react';
import styles from './dropdown.module.css';

interface DropdownProps {
  popup: EventsState['popup']
  title: string;
  children: ReactNode
}

export function Dropdown({ title, children, popup }: DropdownProps) {
  if (!children) return null;
  return (
    <div data-dropdown className={styles.Dropdown}>
      <button data-popup={title} className={styles.button}>
        {title}
      </button>
      {popup === title ? (
        <ul className={styles.list}>
          {children}
        </ul>
      ) : null}
    </div>
  );
}
