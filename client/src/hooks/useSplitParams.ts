import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function useSplitParams() {
  const params = useParams();
  const [state, setState] = useState({
    categoryParam: '',
    itemId: ''
  })
  useEffect(() => {
    if (params['*']) {
      setState({
        categoryParam: params['*'].split('/')[0],
        itemId: params['*'].split('/')[1]
      })
    }
  }, [params])

  return state
}
