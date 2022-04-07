import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Preloader } from '../../../components/Preloader/Preloader'
import { Switch } from '../../../components/Switch/Switch'
import { FetchStatus, useFetch } from '../../../hooks/useFetch'
import { ActionTypes, User, UserURL } from '../types'
import { useUserContext } from '../Users'
import styles from './Profile.module.sass'

export function Profile() {
  const {userId} = useParams()
  const {data, status} = useFetch<User>(`${UserURL.Profile}?userId=${userId}`)

  const {dispatch} = useUserContext()

  useEffect(() => {
    if (userId) {
      dispatch({type: ActionTypes.SelectOneUser, payload: userId})
      dispatch({type: ActionTypes.ShowDropActions, payload: 1})
    }
  }, [dispatch, userId])

  if (!data || status !== FetchStatus.Fulfilled) return <Preloader/>

  const {_id, name, surname, email, img, phone, address, registration, birth} = data

  return (
    <div className={styles.ProfileComponent}>
      <ul className="collection">
        <li className="collection-item avatar">
          <img src={img} alt="" className="circle" />
            <p>{name}</p>
            <p>{surname}</p>
            <p>{_id}</p>
        </li>
        <li className="collection-item avatar">
          <p>{new Date(birth).toLocaleDateString()}</p>
          <p>{address}</p>
        </li>
        <li className="collection-item avatar">
          <p>{new Date(registration).toLocaleDateString()}</p>
          <p>{email}</p>
          <p>{phone}</p>
        </li>
        <li className={`${styles.switch} collection-item avatar`} >
          <Switch label="Active" />
        </li>
      </ul>
    </div>
  )
}