import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function useSplitParams() {
  const params = useParams();
  return useMemo(() => {
    return {
      categoryParam: params['*']?.split('/')[0],
      idParam: params['*']?.split('/')[1]
    };
  }, [params])
}
