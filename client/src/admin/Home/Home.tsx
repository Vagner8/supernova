import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';

interface HomeProps {
  eventsState: EventsState
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch, eventsState }: HomeProps) {

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
