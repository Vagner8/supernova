import styles from './switch.module.css';

interface SwitchProps {
  itemId: string;
  disabled: boolean;
  onClick: (itemId: string) => void;
  label?: [string, string];
}

export function Switch({ itemId, label, disabled, onClick }: SwitchProps) {
  const onClickHandel = () => {
    onClick(itemId);
  };

  return (
    <button
      type="button"
      onClick={onClickHandel}
      className={`${styles.Switch} ${styles[disabled ? '' : 'checked']}`}
    >
      <label>
        {label ? label[0] : null}
        <input type="checkbox" disabled />
        <span></span>
        {label ? label[1] : null}
      </label>
    </button>
  );
}
