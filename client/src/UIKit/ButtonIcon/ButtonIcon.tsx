import { EventsState } from 'admin/Events/eventsState';
import { MouseEvent, useState } from 'react';
import { Icon, IconName } from 'UIKit';
import styles from './buttonIcon.module.css';

interface ButtonIconProps {
  icon: IconName;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  switchTo?: IconName;
  type?: 'white-icon';
  dataPopup?: EventsState['popup'];
}

export function ButtonIcon({
  icon,
  onClick,
  switchTo,
  type,
  dataPopup,
}: ButtonIconProps) {
  const [toggle, setToggle] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    setToggle(!toggle);
  };

  return (
    <div className={styles.ButtonIcon}>
      <button
        type="button"
        onClick={handleClick}
        className={styles.button}
        data-popup={dataPopup}
      >
        <Icon icon={switchTo && toggle ? switchTo : icon} type={type} />
      </button>
    </div>
  );
}
