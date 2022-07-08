import { AdminReducerActions } from 'admin/adminState';
import { EventsState } from 'admin/Events/eventsState';
import { useAdminDispatch } from 'hooks';
import { Dispatch } from 'react';

interface HomeProps {
  eventsState: EventsState;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch, eventsState }: HomeProps) {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
