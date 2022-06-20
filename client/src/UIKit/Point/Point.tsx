import { EventsState } from 'admin/Events/eventsReducer';
import styles from './point.module.css';

interface PointProps {
  keyText: string;
  valueText: string;
  editMode: EventsState['editMode']
}

export function Point({ keyText, valueText, editMode }: PointProps) {
  if (editMode) return null
  return (
    <div className={styles.Point}>
      <small className={styles.small}>{keyText}</small>
      <p>{valueText || '-'}</p>
    </div>
  );
}
