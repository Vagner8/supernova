import { MouseEvent, useEffect, useState } from 'react';
import styles from './dropdown.module.css';

interface DropdownProps {
  list: string[];
  handleTarget: (target: HTMLButtonElement) => void;
}

export function Dropdown({ list, handleTarget }: DropdownProps) {
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
    handleTarget(target)
  };

  return (
    <div className={styles.Dropdown}>
      <button onClick={dropdownClick} className={styles.button}>
        events
      </button>
      {show ? (
        <ul className={styles.list}>
          {list.map((item) => (
            <li key={item}>
              <button className={styles.li_button} onClick={buttonClick}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
