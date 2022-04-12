import styles from './Checkbox.module.sass';

interface PropsCheckbox {
    id: string
    label?: string
    selected: boolean
    selectUsers: (id: string) => () => void
}

export function Checkbox({
  id, label, selected, selectUsers,
} : PropsCheckbox) {
  return (
    <label
      data-action="selected"
      className={styles.label}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={selectUsers(id)}
      />
      <span>{ label }</span>
    </label>
  );
}
