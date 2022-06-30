import { AdminReducerActions, saveOwnerNameAndAvatar } from "admin/adminReducer";
import { fetcher, GoTo } from "api/fetcher";
import { Dispatch, useEffect } from "react";
import { UserProject, UserType } from "../../../../common/src/userTypes";

const projection: Partial<UserProject> = {
  login: '$credentials.login',
  avatar: '$imgs.avatar'
};

export interface UseFetchAvatarAndLoginResponse {
  login: UserType['credentials']['login'],
  avatar: UserType['imgs']['avatar']
}

export function useFetchAvatarAndLogin(
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = (await fetcher<UseFetchAvatarAndLoginResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}?projection=${JSON.stringify(
          projection,
        )}&userId=${localStorage.getItem('adminId')}`,
        adminDispatch,
      }));
      if (!response) return
      saveOwnerNameAndAvatar(adminDispatch, response[0])
    };
    asyncer();
  }, [adminDispatch]);
}
