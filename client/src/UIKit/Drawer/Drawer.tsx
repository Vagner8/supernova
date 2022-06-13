import { AdminState } from 'admin/adminReducer'
import styles from './drawer.module.css'

interface DrawerProps {
  drawer: AdminState['drawer']
}

export function Drawer({drawer}: DrawerProps) {
  return (
    <div className={`${styles.Drawer} ${styles[drawer]}`}>
      Drawer
    </div>
  )
}