import { Icon, Img } from 'UIKit';
import styles from './avatar.module.css';

export interface ProfileProps {
  url: string | null;
  size: 'xs' | 'm' | 'l' | 'chips';
  iconFontSize?: string
}

export function Avatar({ url, size, iconFontSize }: ProfileProps) {
  return (
    <div className={`${styles.Avatar} ${styles[size]}`}>
      {url ? (
        <Img url={url} alt="avatar" fontSize={iconFontSize} />
      ) : (
        <Icon
          icon="account_circle"
          fontSize={iconFontSize}
        />
      )}
    </div>
  );
}
