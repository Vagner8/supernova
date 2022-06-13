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
  | 'save';

interface IconProps {
  icon: IconName;
  fontSize?: string;
  className?: string;
}

export function Icon({ icon, className, fontSize }: IconProps) {
  return (
    <i
      style={{ fontSize }}
      className={`${styles.Icon} ${className} material-icons`}
    >
      {icon}
    </i>
  );
}
