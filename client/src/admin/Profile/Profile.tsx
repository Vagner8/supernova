import { AdminState } from 'admin/adminReducer'
import { Container, Point } from 'UIKit'
import styles from './profile.module.css'

interface ProfileProps {
  adminState: AdminState
}

export default function Profile({adminState}: ProfileProps) {
  return (
    <Container>
      <div className={styles.Profile}>
        <Point title='title'>
          text
        </Point>
      </div>
    </Container>
  )
}