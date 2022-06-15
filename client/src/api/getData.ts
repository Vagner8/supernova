import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { Owner } from '../../../common/src/owner';
import { Projection } from '../../../common/src/types';
import { UrlAddress, fetcher } from './fetcher';

interface GetData {
  adminDispatch: Dispatch<AdminReducerActions>;
  url: UrlAddress;
  projection: Projection<Owner>;
}

export async function getData({ adminDispatch, url, projection }: GetData) {
  const json = JSON.stringify(projection);
  return await fetcher({
    method: 'GET',
    url: `${url}/?projection=${json}`,
    adminDispatch,
    message: 'data did receive',
  });
}
