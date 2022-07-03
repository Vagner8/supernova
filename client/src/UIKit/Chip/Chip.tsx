import { Avatar, ButtonIcon } from 'UIKit';
import styles from './chip.module.css';

interface ChipsProps {
  onClick: (text: string) => () => void;
  text: string;
  url?: string;
  file?: File
}

export function Chip({ onClick, text, url, file }: ChipsProps) {
  return (
    <div className={`${styles.Chip} ${url || file ? styles.with_img : null}`}>
      {url || file ? (
        <Avatar url={ file ? URL.createObjectURL(file) : url} size='chips' />
      ) : null}
      <p className={styles.text}>{text}</p>
      <ButtonIcon icon='cancel' onClick={onClick(text)} />
    </div>
  );
}