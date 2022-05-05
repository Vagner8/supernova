import styles from './status.module.sass';

interface StatusProps {
  disabled: boolean
}

const statusColor = {
  active: 'teal lighten-1',
  disabled: 'grey darken-2'
}

export function Status({disabled}: StatusProps) {
  return (
    <div className={styles.Status_Component}>
      <p className={disabled ? statusColor.disabled : statusColor.active}>
        {disabled ? 'disabled' : 'active'}
      </p>
    </div>
  );
}
