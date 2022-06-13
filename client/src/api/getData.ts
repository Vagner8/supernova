import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { UrlAddress, fetcher } from './fetcher';
import { Owner, Projection } from '../../../common/owner';

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
