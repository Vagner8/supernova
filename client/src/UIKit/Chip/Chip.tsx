import { Avatar, ButtonIcon } from 'UIKit';
import styles from './chip.module.css';

interface ChipProps {
  text: string;
  onClick?: (name: string) => () => void;
  url?: string;
  file?: File;
  className?: string;
}

export function Chip({
  onClick,
  text,
  url,
  file,
  className,
}: ChipProps) {
  return (
    <div
      className={`${className} ${styles.Chip} ${
        url || file ? styles.with_img : null
      }`}
    >
      {url || file ? (
        <Avatar url={file ? URL.createObjectURL(file) : url} size="chips" />
      ) : null}
      <p className={styles.text}>{text}</p>
      {onClick ? (
        <ButtonIcon icon="cancel" onClick={onClick(text)} />
      ) : null}
    </div>
  );
}
