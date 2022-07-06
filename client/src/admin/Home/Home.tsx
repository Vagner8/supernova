import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsState';
import { useAdminDispatch } from 'hooks';
import { Dispatch } from 'react';

interface HomeProps {
  eventsState: EventsState;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch, eventsState }: HomeProps) {

  const dispatch = useAdminDispatch(adminDispatch)
  
  const onClick = () => {
    dispatch.setIsFetching(true)
  }
  return (
    <div>
      <h1>Home</h1>
      <button style={{color: 'black'}} onClick={onClick}>button</button>
    </div>
  );
}
