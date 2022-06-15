import { MouseEvent, useState } from 'react';
import { Icon, IconName } from 'UIKit';
import styles from './buttonIcon.module.css';

interface ButtonIconProps {
  icon: IconName;
  switchTo?: IconName;
  dataSet?: string;
  type?: 'white-icon'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonIcon({
  icon,
  switchTo,
  dataSet,
  type,
  onClick,
}: ButtonIconProps) {
  const [toggle, setToggle] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    setToggle(!toggle);
  };

  return (
    <div className={styles.ButtonIcon} data-set={dataSet}>
      <button type="button" onClick={handleClick} className={styles.button}>
        <Icon icon={switchTo && toggle ? switchTo : icon} type={type} />
      </button>
    </div>
  );
}
