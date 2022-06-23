import styles from './labelText.module.css';

interface PLabelTextProps {
  label: string;
  text: string;
}

export function LabelText({ label, text }: PLabelTextProps) {
  return (
    <div className={styles.Point}>
      <small className={styles.small}>{label}</small>
      <p>{text || '-'}</p>
    </div>
  );
}
