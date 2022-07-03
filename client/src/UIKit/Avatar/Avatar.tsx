import { Icon, Img } from 'UIKit';
import styles from './avatar.module.css';

export interface ProfileProps {
  url: string | undefined | null;
  size: 'xs' | 'm' | 'l' | 'chips';
}

export function Avatar({ url, size }: ProfileProps) {
  return (
    <div className={`${styles.Avatar} ${styles[size]}`}>
      {url ? (
        <Img url={url} alt="avatar" />
      ) : (
        <Icon
          icon="person"
        />
      )}
    </div>
  );
}
