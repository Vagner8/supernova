import { Container } from 'UIKit';
import styles from './users.module.css';

export default function Users() {
  return (
    <Container>
      <div className={styles.Users}>
        <h1>Users</h1>
      </div>
    </Container>
  );
}
