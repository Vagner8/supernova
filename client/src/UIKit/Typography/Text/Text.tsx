import { ReactNode } from 'react';
import styles from './text.module.css';

interface TextProps {
  children: ReactNode;
}

export function Text({ children }: TextProps) {
  return <p className={styles.Title}>{children}</p>;
}
