// import { ReactElement, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import uniqid from 'uniqid';
// import { Point } from '../../components/Point/Point';
// import { Preloader } from '../../components/Preloader/Preloader';
// import { FetchStatus, useFetch, UsersAPI } from '../../hooks/useFetch';
// import { pointsOfUser } from '../helpers';
// import { useUserContext } from '../Users/Users';
// import {
//   Points,
//   ProfileActionType,
//   User,
//   TableActionType,
// } from '../Users/usersState/usersTypes';
// import styles from './Profile.module.sass';

export function Profile() {
  return null;
  // const { userId } = useParams();
  // const { data, status } = useFetch(`${UsersAPI.Profile}?userId=${userId}`);
  // const {
  //   dispatch,
  //   state: { profile, editMode },
  // } = useUserContext();

  // useEffect(() => {
  //   dispatch({ type: ProfileActionType.SetData, payload: data as User });
  // }, [dispatch, data]);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch({ type: TableActionType.SelectOne, payload: userId });
  //   }
  // }, [dispatch, userId]);

  // if (!profile || status !== FetchStatus.Fulfilled) {
  //   return <Preloader />;
  // }

  // const { points, img } = pointsOfUser(profile);

  // function buildPoint(point: Points): ReactElement[] {
  //   return Object.entries(point).map(([key, value]) => (
  //     <Point
  //       key={uniqid()}
  //       img={key === 'name' ? img : null}
  //       value={value}
  //       name={key}
  //       editMode={editMode}
  //     />
  //   ));
  // }

  // return (
  //   <div className={styles.ProfileComponent}>
  //     <ul className="collection">
  //       {points.map((point) => (
  //         <li
  //           key={uniqid()}
  //           className={`${styles.point} collection-item avatar`}
  //         >
  //           {buildPoint(point)}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
