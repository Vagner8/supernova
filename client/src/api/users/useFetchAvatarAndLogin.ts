import { AdminReducerActions } from 'admin/adminState';
import { Projection } from 'admin/UserProfile/userProfileHooks/useFetchToGetUserProfile';
import { fetcher, GoTo } from 'api/fetcher';
import { useAdminDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserType } from '../../../../common/src/userTypes';

export interface UseFetchAvatarAndLoginResponse {
  login: UserType['secret']['login'];
  avatar: UserType['imgs']['avatar'];
}

const projection: Omit<Projection<UseFetchAvatarAndLoginResponse>, '_id'> = {
  login: '$secret.login',
  avatar: '$imgs.avatar'
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
        setIsFetching: adminAction.setIsFetching,
      });
      if (!avatarAndLogin) return;
      adminAction.saveOwnerNameAndAvatar({ avatarAndLogin: avatarAndLogin[0] });
    };
    asyncer();
  }, [adminAction]);
}
