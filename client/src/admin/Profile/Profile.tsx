import { Owner } from 'admin/adminReducer';
import { Avatar, Container, FileInput, Point, Text, Title } from 'UIKit';
import styles from './profile.module.css';

interface ProfileProps {
  owner: Owner | null;
}

export default function Profile({ owner }: ProfileProps) {
  if (!owner) return null;
  const { personal } = owner;

  const points = (obj: any) =>
    Object.entries(obj).map(([key, value]) => {
      if (key === 'avatar') return;
      return <Point key={key} keyText={key} valueText={value as string} />;
    });

  return (
    <Container>
      <div className={styles.Profile}>
        <div className={styles.lift}>
          <Avatar url={personal.avatar} size="m" />
          <h6>
            {personal.name} {personal.surname}
          </h6>
        </div>
        <div className={styles.middle}>
          <h6>Personal</h6>
          <div className={styles.point_wrapper}>{points(owner.personal)}</div>
          <h6>Contacts</h6>
          <div className={styles.point_wrapper}>{points(owner.contacts)}</div>
          <h6>Address</h6>
          <div className={styles.point_wrapper}>{points(owner.address)}</div>
        </div>
        <div className={styles.right}></div>
      </div>
    </Container>
  );
}
