import { AdminReducerActions } from 'admin/adminReducer';
import { EventsReducerActions, saveUsers } from 'admin/Events/eventsReducer';
import { GoTo, fetcher } from 'api/fetcher';
import { Dispatch, useEffect } from 'react';
import { UserPointsType, UserProject, UserType } from '../../../../common/src/userTypes';

type Projection = Pick<
  UserProject,
  'userId' | 'name' | 'surname' | 'email' | 'phone' | 'rule' | 'avatar'
>;

const projection: Projection = {
  userId: '$userId',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$credentials.rule',
  avatar: '$imgs.avatar',
};

// const foo = (obj: typeof projection) => {
//   let newObj = {...obj}
//   Object.entries(newObj).forEach(([key, value]) => {
//     const splitValue = value.split('.')[0].slice(1)
//     if (newObj[key as keyof typeof newObj] === '$contacts.email') {
//       newObj[key as keyof typeof newObj] = ''
//     }
//   })
//   return newObj
// }

// type Test<T> = {
//   [Key in keyof T]: Key extends keyof UserType ? UserType[Key] : never
// } 

// type Points<T> = {
//   [Key in keyof T]: Key extends never ? UserPointsType['']
// }

// const test: Test<Projection> = {
//   userId: '',
// }

export interface UseFetchUsersForTableResponse {
  _id: string;
  userId: UserType['userId'];
  name: UserType['personal']['name'];
  surname: UserType['personal']['surname'];
  email: UserType['contacts']['email'];
  phone: UserType['contacts']['phone'];
  rule: UserType['credentials']['rule'];
  avatar: UserType['imgs']['avatar'];
}

export function useFetchUsersForTable(
  eventsDispatch: Dispatch<EventsReducerActions>,
  adminDispatch: Dispatch<AdminReducerActions>,
) {
  useEffect(() => {
    const asyncer = async () => {
      const response = await fetcher<UseFetchUsersForTableResponse[]>({
        method: 'GET',
        url: `${GoTo.Aggregate}/?projection=${JSON.stringify(projection)}`,
        adminDispatch,
      });
      if (!response) return;
      saveUsers(eventsDispatch, response);
    };
    asyncer();
  }, [eventsDispatch, adminDispatch]);
}
