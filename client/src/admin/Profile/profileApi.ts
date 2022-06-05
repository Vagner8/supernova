import { AdminReducerActions } from 'admin/adminReducer';
import { getOwner } from 'api/getOwner';
import { Dispatch } from 'react';
import { ProfileReducerActions, ProfileStrAction } from './profileReducer';
import { Personal, Contacts, Address } from './../../../../common/owner'

export interface OwnerPII {
  personal: Personal;
  contacts: Contacts;
  address: Address;
}

export async function fetchAndSaveOwnerPII(
  profileDispatch: Dispatch<ProfileReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const ownerPII = (await getOwner(adminDispatch, {
    _id: 0,
    personal: 1,
    contacts: 1,
    address: 1,
  })) as OwnerPII | undefined;
  if (!ownerPII) return
  profileDispatch({
    type: ProfileStrAction.SaveOwnerPII,
    payload: { ownerPII },
  });
}
