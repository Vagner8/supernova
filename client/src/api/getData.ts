import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { UrlAddress, fetcher } from './fetcher';
import { Owner, Personal, Contacts, Address } from '../../../common/owner';

type Projection<T> = {
  [Prop in keyof T]?: T[Prop] extends Personal | Contacts | Address
    ? Projection<T[Prop]> | 0 | 1
    : 1 | 0;
};

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
