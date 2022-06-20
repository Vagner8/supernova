import { useEffect, useState } from 'react';

export function useLocalStorageData(name: string) {
  const [state, setState] = useState<null | string>(null);
  useEffect(() => setState(localStorage.getItem(name)), [name]);
  return state;
}
