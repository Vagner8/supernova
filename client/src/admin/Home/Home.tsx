import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { Circular, Container } from 'UIKit';

interface HomeProps {
  eventsState: EventsState
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch, eventsState }: HomeProps) {

  console.log(eventsState)

  return (
    <Container>
      <Circular color='white' />
      <h1>Home</h1>
    </Container>
  );
}
