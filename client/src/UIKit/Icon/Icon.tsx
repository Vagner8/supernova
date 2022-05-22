import styles from './icon.module.css';

interface IconProps {
  className?: string;
  icon:
    | 'visibility'
    | 'visibility_off'
    | 'send'
    | 'error'
    | 'menu'
    | 'account_circle';
}

export function Icon({ icon, className }: IconProps) {
  return <i className={`${styles.Icon} ${className} material-icons`}>{icon}</i>;
}
