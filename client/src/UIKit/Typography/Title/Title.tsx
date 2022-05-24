import { ReactNode } from 'react';
import styles from './title.module.css';

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <p className={styles.Title}>{children}</p>;
}
