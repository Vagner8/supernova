import { useState } from 'react';
import { Icon } from 'UIKit';
import styles from './img.module.css';

interface ImgProps {
  url: string;
  alt: string;
  fontSize: string | undefined;
}

export function Img({ url, alt, fontSize }: ImgProps) {
  const [error, setError] = useState(false);
  const onError = () => setError(true);
  if (error)
    return (
      <Icon fontSize={fontSize} className={styles.icon} icon="account_circle" />
    );
  return <img onError={onError} className={styles.Img} src={url} alt={alt} />;
}
