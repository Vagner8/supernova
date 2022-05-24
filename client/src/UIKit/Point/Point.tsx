import { IconName, Title, Text } from 'UIKit';
import { Icon } from 'UIKit/Icon/Icon';
import styles from './point.module.css'

interface PointProps {
  title: string;
  children: string;
  iconName?: IconName
}

export function Point({title, children, iconName}: PointProps) {
  return (
    <div className={styles.Point}>
      {iconName ? <Icon icon={iconName}/> : null}
      <Title>{title}</Title>
      <Text>{children}</Text>
    </div>
  )
}