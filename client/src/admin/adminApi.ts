import { getOwner } from 'api/getOwner';
import { Dispatch } from 'react';
import { Personal, Owner } from './../../../common/owner';
import { AdminReducerActions, AdminStrAction } from './adminReducer';

export interface OwnerCommonData {
  login: Owner['login'];
  personal: {
    avatar: Personal['avatar'];
  };
}

export async function storeOwnerCommonData(
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const ownerCommonData = (await getOwner(adminDispatch, {
    _id: 0,
    login: 1,
    personal: {
      avatar: 1
    }
  })) as OwnerCommonData | undefined;
  if (!ownerCommonData) return
  adminDispatch({
    type: AdminStrAction.SaveOwnerCommonData,
    payload: { ownerCommonData },
  });
}
