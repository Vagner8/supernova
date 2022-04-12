import styles from './Preloader.module.sass';

export function Preloader() {
  return (
    <div className={`${styles.progress} progress`}>
      <div className="indeterminate" />
    </div>
  );
}
