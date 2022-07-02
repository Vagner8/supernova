import { Avatar, ButtonIcon } from 'UIKit';
import styles from './chips.module.css';

interface ChipsProps {
  onClick: (text: string) => () => void;
  text: string;
  url?: string;
  file?: File
}

export function Chips({ onClick, text, url, file }: ChipsProps) {
  return (
    <div className={`${styles.Chips} ${url || file ? styles.with_img : null}`}>
      {url || file ? (
        <Avatar url={ file ? URL.createObjectURL(file) : url} size='chips' />
      ) : null}
      <p className={styles.text}>{text}</p>
      <ButtonIcon icon='cancel' onClick={onClick(text)} />
    </div>
  );
}