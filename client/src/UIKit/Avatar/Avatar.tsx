import { Icon, Img } from 'UIKit';
import styles from './avatar.module.css';

interface ProfileProps {
  url?: string;
}

export function Avatar({ url }: ProfileProps) {
  const showImg = () => {
    if (url) return <Img url={url} alt="avatar"/>
    return <Icon className={styles.icon} icon="account_circle" />;
  };
  return (
    <div className={styles.Avatar}>
      <div className={styles.img_wrapper}>{showImg()}</div>
    </div>
  );
}
