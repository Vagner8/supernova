import { AdminReducerActions, useAdminDispatch } from 'admin/adminState';
import { Projection } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { fetcher, GoTo } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export interface UseFetchAvatarAndLoginResponse {
  login: UserType['secret']['login'];
  avatar: UserType['imgs']['avatar'];
}

const projection: Omit<Projection<UseFetchAvatarAndLoginResponse>, '_id'> = {
  login: '$secret.login',
  avatar: '$imgs.avatar',
};

export function useFetchAvatarAndLogin(
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const adminAction = useAdminDispatch(adminDispatch);
  useEffect(() => {
    const asyncer = async () => {
      const avatarAndLogin = await fetcher<UseFetchAvatarAndLoginResponse[]>({
        method: 'GET',
        url: `${GoTo.UserAggregate}?projection=${JSON.stringify(
          projection,
        )}&itemId=${localStorage.getItem('adminId')}`,
        saveOperationResult: adminAction.saveOperationResult,
        setAdminState: adminAction.setAdminState,
      });
      if (!avatarAndLogin) return;
      adminAction.setAdminState({
        adminAvatar: avatarAndLogin[0].avatar[0],
        adminLogin: avatarAndLogin[0].login,
      });
    };
    asyncer();
  }, [adminAction]);
}
