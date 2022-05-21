import styles from './linear.module.css';

interface LinearProps {
  show: boolean;
}

export function Linear({ show }: LinearProps) {
  if (!show) return null;
  return (
    <progress className={styles.Linear}/>
  );
}
