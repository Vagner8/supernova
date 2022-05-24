import styles from './circular.module.css';

interface CircularProps {
  className?: string;
  color: string;
}

export function Circular({className = '', color}: CircularProps) {
  return (
    <div className={`${styles.Circular} ${styles[className]}`}>
      <svg
        className={styles.spinner}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.circle}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke={color}
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
}
