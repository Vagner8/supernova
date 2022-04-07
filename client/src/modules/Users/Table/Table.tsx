import { Checkbox } from '../../../components/Checkbox/Checkbox'
import { NavLink } from 'react-router-dom'
import styles from './Table.module.sass'
import { useUserContext } from '../Users'
import { ActionTypes, User, UserURL } from '../types'
import { FetchStatus, useFetch } from '../../../hooks/useFetch'
import { useEffect } from 'react'
import { Preloader } from '../../../components/Preloader/Preloader'

export function Table() {
  const {data, status} = useFetch<User[]>(UserURL.AllUsers)
  const {dispatch, state: {users, selectAllUsers}} = useUserContext()

  useEffect(() => {
    if (data) {
      dispatch({type: ActionTypes.SetData, payload: data})
    }
  }, [dispatch, data])

  useEffect(() => {
    dispatch({type: ActionTypes.ShowDropActions, payload: users.filter(user => user.selected).length})
  }, [dispatch, users])

  function selectUsers(id: string) {
    return function() {
      dispatch({type: ActionTypes.SelectUsers, payload: id})
    }
  }

  if (!data || status !== FetchStatus.Fulfilled) return <Preloader />

  return (
    <>
      <ul className={`${styles.list} collection`}>
        <li className='collection-item'>
          <Checkbox
            id="all"
            selectUsers={selectUsers}
            selected={selectAllUsers}
          />
        </li>
        {users.map(item => {
          const { _id, name, surname, email, selected, img } = item
          return (
            <li key={_id} className={`${styles.item} collection-item`}>
              <div className={styles.left}>
                <Checkbox
                  id={_id}
                  selected={selected}
                  selectUsers={selectUsers}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.image}>
                  <img  src={img} alt="" />
                </div>
                <div>{_id}</div>
                <div>{name}</div>
                <div>{surname}</div>
                <div>{email}</div>
                <NavLink
                  className={styles.navlink}
                  to={`${_id}` }
                />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}