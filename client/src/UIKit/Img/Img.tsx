import { useState } from 'react';
import { Icon } from 'UIKit';
import styles from './img.module.css';

interface ImgProps {
  url: string;
  alt: string;
}

export function Img({ url, alt }: ImgProps) {
  const [error, setError] = useState(false);
  const onError = () => setError(true);
  if (error)
    return (
      <Icon icon="account_circle" />
    );
  return <img onError={onError} className={styles.Img} src={url} alt={alt} />;
}
