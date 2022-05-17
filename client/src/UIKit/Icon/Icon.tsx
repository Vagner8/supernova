import styles from './Icon.module.css'

interface IconProps {
  icon: 'visibility' | 'visibility_off' | 'send' | 'error'
}

export function Icon({icon}: IconProps) {
  return <i className={`${styles.Icon} material-icons`}>{icon}</i>
}