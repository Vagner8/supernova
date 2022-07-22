import { useEffect, useState } from 'react';

export function useLocalStorage(name: 'adminId') {
  const [state, setState] = useState<null | string>(null);
  useEffect(() => {
    setState(localStorage.getItem(name));
  }, [name]);
  return state;
}
