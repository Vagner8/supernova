import { AdminReducerActions } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { API, fetcher } from './fetcher';
import { Owner, Personal, Contacts, Address } from './../../../common/owner'

type Projection<T> = {
  [Prop in keyof T]?: T[Prop] extends Personal | Contacts | Address
    ? Projection<T[Prop]> | 0 | 1
    : 1 | 0;
};

export type OwnerProjection = Projection<Owner>;

export async function getOwner(
  adminDispatch: Dispatch<AdminReducerActions>,
  projection: OwnerProjection,
) {
  const json = JSON.stringify(projection);
  const url = `${API.Owner}/?projection=${json}`;
  return (await fetcher({
    method: 'GET',
    url,
    adminDispatch,
    message: 'Successful response',
  }));
}
