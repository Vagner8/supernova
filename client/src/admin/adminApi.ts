import { AdminReducerActions, saveOwnerCommonData } from 'admin/adminReducer';
import { UrlAddress } from 'api/fetcher';
import { getData } from 'api/getData';
import { Dispatch } from 'react';
import { Personal, Owner } from './../../../common/owner';

export interface OwnerCommonData {
  login: Owner['login'];
  personal: {
    avatar: Personal['avatar'];
  };
}

interface FetchAndSaveOwnerCommonData {
  adminDispatch: Dispatch<AdminReducerActions>;
  url: UrlAddress;
}

export async function fetchAndSaveOwnerCommonData({
  adminDispatch,
  url,
}: FetchAndSaveOwnerCommonData) {
  const ownerCommonData = (await getData({
    adminDispatch,
    url,
    projection: {
      _id: 0,
      login: 1,
      personal: {
        avatar: 1,
      },
    },
  })) as OwnerCommonData | undefined;
  if (!ownerCommonData) return;
  saveOwnerCommonData(adminDispatch, ownerCommonData)
}
