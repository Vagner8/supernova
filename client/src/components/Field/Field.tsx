import styles from './Field.module.sass';

interface FieldProps {
  title: string;
  value: string;
}

export function Field({ title, value }: FieldProps) {
  return (
    <div className={styles.Field_Component}>
      <small>{title}</small>
      <p>{value}</p>
    </div>
  );
}
