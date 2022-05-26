import styles from './point.module.css';

interface PointProps {
  keyText: string;
  valueText: string;
}

export function Point({ keyText, valueText }: PointProps) {
  return (
    <div className={styles.Point}>
      <small className={styles.small}>{keyText}</small>
      <p>{valueText}</p>
    </div>
  );
}