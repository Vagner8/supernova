import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { Circular, Container } from 'UIKit';

interface HomeProps {
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch }: HomeProps) {

  return (
    <Container>
      <Circular color='white' />
      <h1>Home</h1>
    </Container>
  );
}
