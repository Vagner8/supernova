import { AdminReducerActions } from 'admin/adminState';
import { fetcher, GoTo } from 'api/fetcher';
import { useAdminDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { UserProject, UserType } from '../../../../common/src/userTypes';

const projection: Partial<UserProject> = {
  login: '$credentials.login',
  avatar: '$imgs.avatar',
};

export interface UseFetchAvatarAndLoginResponse {
  login: UserType['credentials']['login'];
  avatar: UserType['imgs']['avatar'];
}

export function useFetchAvatarAndLogin(
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  const adminAction = useAdminDispatch(adminDispatch);
  useEffect(() => {
    const asyncer = async () => {
      const avatarAndLogin = await fetcher<UseFetchAvatarAndLoginResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}?projection=${JSON.stringify(
          projection,
        )}&userId=${localStorage.getItem('adminId')}`,
        saveOperationResult: adminAction.saveOperationResult,
        setIsFetching: adminAction.setIsFetching,
      });
      if (!avatarAndLogin) return;
      adminAction.saveOwnerNameAndAvatar({ avatarAndLogin: avatarAndLogin[0] });
    };
    asyncer();
  }, [adminAction]);
}
