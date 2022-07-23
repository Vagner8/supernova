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
    const categoryParam =
      splitPathname.find((item) => item === 'users' || item === 'products') ||
      '';
    const itemIdIndex = splitPathname.indexOf(categoryParam) + 1;
    const itemId = itemIdIndex > 0 ? splitPathname[itemIdIndex] : '';
    setState({
      categoryParam,
      itemId,
    });
  }, [pathname]);

  return state;
}
