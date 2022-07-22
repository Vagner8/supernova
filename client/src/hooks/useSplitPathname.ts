import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useSplitPathname() {
  const { pathname } = useLocation();
  const [state, setState] = useState<{
    categoryParam: string;
    itemId: string;
  }>({
    categoryParam: '',
    itemId: '',
  });
  useEffect(() => {
    const splitPathname = pathname.split('/');
    setState({
      categoryParam: splitPathname.find(
        (item) => item === 'users' || item === 'products',
      ) || '',
      itemId: splitPathname[splitPathname.length - 1],
    });
  }, [pathname]);

  return state;
}
