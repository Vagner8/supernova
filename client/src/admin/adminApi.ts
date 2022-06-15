import { UrlAddress } from 'api/fetcher';
import { getData } from 'api/getData';
import { Dispatch } from 'react';
import { AdminReducerActions, saveOwnerNameAndAvatar } from './adminReducer';

interface FetchAndSaveAvatarAndLogin {
  url: UrlAddress;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export interface FetchAndSaveAvatarAndLoginResponse {
  login: string;
  imgUrls: { avatar: string[] };
}

export async function fetchAndSaveAvatarAndLogin({
  url,
  adminDispatch,
}: FetchAndSaveAvatarAndLogin) {
  const avatarAndLogin = (await getData({
    adminDispatch,
    url,
    projection: {
      _id: 0,
      login: 1,
      imgUrls: {
        avatar: 1,
      },
    },
  })) as FetchAndSaveAvatarAndLoginResponse | undefined;
  if (!avatarAndLogin) return
  saveOwnerNameAndAvatar(adminDispatch, avatarAndLogin)
}
