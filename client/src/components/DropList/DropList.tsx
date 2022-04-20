import { useLayoutEffect, useRef } from 'react';
import M from 'materialize-css';
import styles from './DropList.module.sass';
import { DropItem } from '../../admin/Users/usersState/usersTypes';
import { ClickHandler } from '../../share/shareTypes';

interface Props {
  title: string;
  dropList: DropItem[];
  onClickDropdown: ClickHandler;
  setDropItemTitle: (todo: string) => string;
}

export function DropList({
  title,
  dropList,
  onClickDropdown,
  setDropItemTitle,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      M.Dropdown.init(ref.current);
    }
  }, []);

  return (
    <div className={styles.Dropdown_Component}>
      <button
        ref={ref}
        className="dropdown-trigger btn"
        data-target="dropdown1"
        type="button"
      >
        {title}
      </button>

      <ul id="dropdown1" className="dropdown-content">
        {dropList.map((item) => {
          if (item.disabled) return null;
          return (
            <li className={styles.item} key={item.todo}>
              <button
                id={item.todo}
                className={`${styles.button} btn`}
                type="button"
                onClick={onClickDropdown}
                aria-label={item.todo}
              >
                {setDropItemTitle(item.todo)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
