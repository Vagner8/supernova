import { ReactNode } from 'react';
import styles from './point.module.css';

interface PointProps {
  title: string;
  children: ReactNode;
}

export function Point({ children, title }: PointProps) {
  return (
    <>
      <h5>{title}</h5>
      <div className={styles.Point}>{children}</div>
    </>
  );
}
