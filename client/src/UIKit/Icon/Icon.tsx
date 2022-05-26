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
  | 'warning';

interface IconProps {
  className?: string;
  icon: IconName;
}

export function Icon({ icon, className }: IconProps) {
  return <i className={`${styles.Icon} ${className} material-icons`}>{icon}</i>;
}
