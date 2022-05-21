import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { fetcher } from 'api/fetcher';
import { Dispatch } from 'react';
import { Button, Linear, Navbar } from 'UIKit';

interface HomeProps {
  adminDispatch: Dispatch<AdminReducerActions>;
}

export default function Home({ adminDispatch }: HomeProps) {
  // useEffect(() => {
  //   const verifyToken = async () => {
  //     const response = await fetchData<string>('GET', '/users');
  //     if (response) {
  //       console.log(response)
  //     }
  //   };
  //   verifyToken();
  // }, []);

  const onClick = async () => {
    const res = await fetcher<string>('GET', '/users', adminDispatch);
    if (typeof res === 'string') {
      return console.log(res)
    }
    if (!res || 'logout' in res) {
      return adminDispatch({ type: AdminStrAction.SetErr, payload: res });
    }
  };

  return (
    <>
      <Navbar />
    </>
  );
}
