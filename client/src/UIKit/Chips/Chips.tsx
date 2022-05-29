import { Icon, Avatar } from 'UIKit';
import styles from './chips.module.css';

interface ChipsProps {
  onClick: (text: string) => () => void;
  text: string;
  url?: string;
}

export function Chips({ onClick, url, text }: ChipsProps) {
  console.log('text', text, typeof text)
  console.log('url', url, typeof url)
  return (
    <div className={`${styles.Chips} ${url ? styles.with_img : null}`}>
      {url ? (
        <Avatar url={url} size='chips' />
      ) : null}
      <p className={styles.text}>{text}</p>
      <button onClick={onClick(text)}>
        <Icon className={styles.icon} icon="cancel" />
      </button>
    </div>
  );
}
