import { ChangeHandler } from '../../share/shareTypes';
import styles from './Checkbox.module.sass';

interface PropsCheckbox {
  id: string;
  label?: string;
  selected: boolean;
  onChange: ChangeHandler;
}

export function Checkbox({
  id, label, selected, onChange,
}: PropsCheckbox) {
  return (
    <label htmlFor={id} data-action="selected" className={styles.label}>
      <input
        type="checkbox"
        id={id}
        checked={selected}
        onChange={onChange}
        aria-label={id}
      />
      <span>{label}</span>
    </label>
  );
}

Checkbox.defaultProps = {
  label: '',
};
