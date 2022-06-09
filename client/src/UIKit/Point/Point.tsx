import styles from './point.module.css';

interface PointProps {
  keyText: string;
  valueText: string;
  hide: boolean
}

export function Point({ keyText, valueText, hide }: PointProps) {
  if (hide) return null
  return (
    <div className={styles.Point}>
      <small className={styles.small}>{keyText}</small>
      <p>{valueText || '-'}</p>
    </div>
  );
}
