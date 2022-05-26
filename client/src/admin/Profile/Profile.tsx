import { Owner } from 'admin/adminReducer';
import { Container, Point, Text, Title } from 'UIKit';
import styles from './profile.module.css';

interface ProfileProps {
  owner: Owner | null;
}

export default function Profile({ owner }: ProfileProps) {
  if (!owner) return null;
  const points = Object.entries(owner).map(([key, value]) => (
    <Point key={key} title={key}>
      {Object.entries(value).map(([title, text]) => (
        <>
          <Title>{title}</Title>
          <Text>{text as string}</Text>
        </>
      ))}
    </Point>
  ));

  return (
    <Container>
      <div className={styles.Profile}>
        {points}
      </div>
    </Container>
  );
}
