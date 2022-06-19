import styles from './pageHeader.module.css';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className={styles.PageHeader}>
      <h1>{title}</h1>
    </div>
  );
}
