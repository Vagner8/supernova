import { useParams } from 'react-router-dom';

export function useSplitParams() {
  const params = useParams();
  return {
    paramsName: params['*']?.split('/')[0],
    paramsId: params['*']?.split('/')[1]
  };
}
