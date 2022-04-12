import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import { Point } from '../../../components/Point/Point';
import { Preloader } from '../../../components/Preloader/Preloader';
// import { Switch } from '../../../components/Switch/Switch'
import { FetchStatus, useFetch } from '../../../hooks/useFetch';
import { pointsOfUser } from '../helpers';
import { ProfileActionType } from '../reducers/profileReducer/profileReducer';
import { UsersActionType } from '../reducers/usersReducer';
import { Points, User, UserURL } from '../types';
import { useUserContext } from '../Users';
import styles from './Profile.module.sass';

export function Profile() {
  const { userId } = useParams();
  const { data, status } = useFetch<User>(`${UserURL.Profile}?userId=${userId}`);

  const { profileDispatch, usersDispatch, profileState } = useUserContext();

  useEffect(() => {
    if (data) {
      profileDispatch({ type: ProfileActionType.SetData, payload: data });
    }
  }, [profileDispatch, data]);

  useEffect(() => {
    if (userId) {
      usersDispatch({ type: UsersActionType.SelectOneUser, payload: userId });
      usersDispatch({ type: UsersActionType.ShowDropActions, payload: 1 });
    }
  }, [usersDispatch, userId]);

  if (!profileState.user || status !== FetchStatus.Fulfilled) return <Preloader />;

  const { points, img } = pointsOfUser(profileState.user);

  function buildPoint(point: Points) : ReactElement[] {
    return Object.entries(point).map(([key, value]) => (
      <Point
        key={uniqid()}
        img={key === 'name' ? img : null}
        value={value}
        name={key}
        editMode={profileState.editMode}
      />
    ));
  }

  return (
    <div className={styles.ProfileComponent}>
      <ul className="collection">
        {points.map((point) => (
          <li key={uniqid()} className={`${styles.point} collection-item avatar`}>
            {buildPoint(point)}
          </li>
        ))}
      </ul>
    </div>
  );
}
