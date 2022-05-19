import { Dispatch, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  DropListActionType,
  UsersReducerActions,
  UsersState,
} from '../Users/usersState/usersTypes';
import styles from './Profile.module.sass';

interface FieldProps {
  title: string;
  value: string;
  editMode: boolean;
  textInput: string[];
  datePicker: string[];
  stable: string[];
}

function Fields({
  title,
  value,
  editMode,
  textInput,
  datePicker,
  stable,
}: FieldProps) {
  // if (title.match(/img/i)) {
  //   return (
  //     <li>
  //       <img src={value} alt={title} />
  //     </li>
  //   );
  // }
  // if (!editMode) {
  //   return (
  //     <li>
  //       <Field title={title} value={value} />
  //     </li>
  //   );
  // }

  // if (editMode) {
  //   if (stable.includes(title)) {
  //     return <Field title={title} value={value} />;
  //   }
  //   if (textInput.includes(title)) {
  //     return <TextInput label={title} initialValue={value} />;
  //   }
  //   if (datePicker.includes(title)) {
  //     return <DatePicker label={title} initialValue={value} />;
  //   }
  // }

  return null;

  // return (
  //   <li>
  //     {noInput.includes(title) || !editMode ? (
  //       <Field title={title} value={value} />
  //     ) : (
  //       <TextInput label={title} initialValue={value} />
  //     )}
  //   </li>
  // );
}

interface ProfileProps {
  usersState: UsersState;
  usersDispatch: Dispatch<UsersReducerActions>;
}

export function Profile({ usersState, usersDispatch }: ProfileProps) {
  return null
  // const { userId } = useParams();
  // useFetchUsers(usersDispatch, `${UsersAPI.Profile}?userId=${userId}`);
  // const { users, isFetching, editMode } = usersState;

  // useEffect(() => {
  //   usersDispatch({
  //     type: DropListActionType.AdjustDropList,
  //     payload: {
  //       numberSelectedUsers: 1,
  //     },
  //   });
  // }, [usersDispatch, users]);

  // if (!users || isFetching) return <Preloader />;
  // return (
  //   <div className={styles.Profile_Component}>
  //     <ul>
  //       {Object.entries(users[0]).map(([key, value]) => {
  //         return (
  //           <Fields
  //             key={uniqid()}
  //             title={key}
  //             value={value}
  //             editMode={editMode}
  //             textInput={['name', 'surname', 'phone', 'address']}
  //             datePicker={['birth']}
  //             stable={['_id', 'registration']}
  //           />
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
}
