import styles from './img.module.css'

interface ImgProps {
  url: string;
  alt: string
}

export function Img({url, alt}: ImgProps) {
  return <img className={styles.Img} src={url} alt={alt} />
}