import { Avatar, ButtonIcon } from 'UIKit';
import styles from './chips.module.css';

interface ChipsProps {
  onClick: (text: string) => () => void;
  text: string;
  url?: string;
}

export function Chips({ onClick, url, text }: ChipsProps) {
  return (
    <div className={`${styles.Chips} ${url ? styles.with_img : null}`}>
      {url ? (
        <Avatar url={url} size='chips' />
      ) : null}
      <p className={styles.text}>{text}</p>
      <ButtonIcon icon='cancel' onClick={onClick(text)} />
    </div>
  );
}
