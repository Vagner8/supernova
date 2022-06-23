import { AdminReducerActions, saveOwnerNameAndAvatar } from "admin/adminReducer";
import { AddressTo, fetcher } from "api/fetcher";
import { Dispatch, useEffect } from "react";
import { Projection } from "../../../../common/src/commonTypes";
import { UserType } from "../../../../common/src/userTypes";

const projection: Projection<UserType> = {
  _id: 0,
  configs: {
    login: 1
  },
  imgs: {
    avatar: 1,
  },
};

export interface UseFetchAvatarAndLoginResponse {
  configs: {
    login: UserType['configs']['login']
  },
  imgs: {
    avatar: UserType['imgs']['avatar']
  },
}

export function useFetchAvatarAndLogin(
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = (await fetcher({
        method: 'GET',
        url: `${AddressTo.GetUsers}/?projection=${JSON.stringify(
          projection,
        )}`,
        adminDispatch,
      })) as UseFetchAvatarAndLoginResponse | null;
      if (!response) return
      saveOwnerNameAndAvatar(adminDispatch, response)
    };
    asyncer();
  }, [adminDispatch]);
}
