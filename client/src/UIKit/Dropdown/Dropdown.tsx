import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import styles from './dropdown.module.css';

interface DropdownProps {
  title: string;
  children: ReactNode
}

export function Dropdown({ title, children }: DropdownProps) {
  const [show, setSow] = useState(false);

  useEffect(() => {
    function onClickDocument(this: HTMLElement, e: Event) {
      if (!e.target) return;
      if ((e.target as HTMLElement).closest('.dropdown_Dropdown__rppfE')) return
      setSow(false);
    }
    document.addEventListener('click', onClickDocument);
    return () => document.removeEventListener('click', onClickDocument);
  }, []);

  const dropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSow(true);
  };

  if (!children) return null;

  return (
    <div data-dropdown className={styles.Dropdown}>
      <button onClick={dropdownClick} className={styles.button}>
        {title}
      </button>
      {show ? (
        <ul className={styles.list}>
          {children}
        </ul>
      ) : null}
    </div>
  );
}
