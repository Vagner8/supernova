import { useLayoutEffect, useRef } from 'react';
import M from 'materialize-css';
import { DropAction, OnClickDropdown, Todo } from '../../modules/Users/types';
import styles from './Dropdown.module.sass';

interface PropsDropdown {
  title: string
  dropdownList: DropAction[]
  editMode: boolean
  onClickDropdown: OnClickDropdown
}

export function Dropdown(
  {
    title,
    dropdownList,
    editMode,
    onClickDropdown,
  }: PropsDropdown,
) {
  const ref = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      M.Dropdown.init(ref.current);
    }
  }, []);

  function setItemName(todo: string) : string {
    if (todo === Todo.Edit) {
      return editMode ? 'Edit off' : 'Edit on';
    }
    return todo;
  }

  return (
    <div className={styles.DropdownComponent}>
      <button ref={ref} className="dropdown-trigger btn" data-target="dropdown1">
        {title}
      </button>

      <ul
        id="dropdown1"
        className="dropdown-content"
      >
        {dropdownList.map((item) => {
          if (item.disabled) return null;
          return (
            <li className={styles.item} key={item.todo}>
              <a href="#!" onClick={onClickDropdown}>
                {setItemName(item.todo)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Dropdown.defaultProps = {
  title: 'Actions',
  dropdownList: [],
  editMode: false,
  onClickDropdown: () => {},
};
