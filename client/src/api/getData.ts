import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { Projection } from '../../../common/src/commonTypes';
import { OwnerType } from '../../../common/src/ownerTypes';
import { UrlAddress, fetcher } from './fetcher';

interface GetData {
  adminDispatch: Dispatch<AdminReducerActions>;
  url: UrlAddress;
  projection: Projection<OwnerType>;
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
