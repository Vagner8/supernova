import { capitalizer } from 'helpers';
import { Icon, IconName } from 'UIKit';
import styles from './headerblock.module.css';

interface IhpProps {
  icon: IconName;
  title: string;
  text: string;
}

export function Headerblock({ icon, title, text }: IhpProps) {
  return (
    <div className={styles.Headerblock}>
      <Icon className={styles.icon} icon={icon} />
      <h6 className={styles.header}>{capitalizer({ index: 0, str: title })}</h6>
      <p className={styles.text}> {capitalizer({ index: 0, str: text })}</p>
    </div>
  );
}
