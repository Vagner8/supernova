import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';

interface HomeProps {
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch }: HomeProps) {
  return (
    <>
      <h1>Home</h1>

      <input type="file" />
    </>
  );
}
