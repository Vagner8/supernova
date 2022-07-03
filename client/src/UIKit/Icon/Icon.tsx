import styles from './icon.module.css';

export type IconName =
  | 'visibility'
  | 'visibility_off'
  | 'send'
  | 'error'
  | 'menu'
  | 'account_circle'
  | 'close'
  | 'delete'
  | 'cancel'
  | 'task_alt'
  | 'warning'
  | 'edit'
  | 'block'
  | 'save'
  | 'chevron_left'
  | 'home'
  | 'people'
  | 'arrow_drop_down'
  | 'person';

interface IconProps {
  icon: IconName;
  type?: 'normal' | 'in-button' | 'white-icon';
}

export function Icon({ icon, type = 'normal' }: IconProps) {
  return (
    <i
      className={`${styles.Icon} ${styles[type]} material-icons-outlined`}
    >
      {icon}
    </i>
  );
}
