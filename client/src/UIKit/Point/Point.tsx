import styles from './point.module.css';

interface PointProps {
  label: string;
  text: string;
}

export function Point({ label, text }: PointProps) {
  return (
    <div className={styles.Point}>
      <small className={styles.small}>{label}</small>
      <p>{text || '-'}</p>
    </div>
  );
}
