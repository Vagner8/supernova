import { Icon, Img } from 'UIKit';
import styles from './avatar.module.css';

export interface ProfileProps {
  url: string | null;
  size: 'xs' | 'm' | 'l' | 'chips';
}

export function Avatar({ url, size }: ProfileProps) {
  const showImg = () => {
    if (url) return <Img url={url} alt="avatar" />;
    return <Icon className={styles.icon} icon="account_circle" />;
  };
  return <div className={`${styles.Avatar} ${styles[size]}`}>{showImg()}</div>;
}
