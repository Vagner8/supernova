import { AdminReducerActions } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { Select } from 'UIKit/Select/Select';

interface HomeProps {
  eventsState: EventsState;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch, eventsState }: HomeProps) {
  const onClick = () => {};

  return (
    <div>
      <h1>Home</h1>
      <Select
        popup={eventsState.popup}
        title="Choose rule"
        selectList={['user', 'admin', 'owner']}
        onClick={onClick}
      />
    </div>
  );
}
