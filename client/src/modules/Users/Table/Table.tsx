import { Checkbox } from '../../../components/Checkbox/Checkbox'
import { NavLink } from 'react-router-dom'
import styles from './Table.module.sass'
import { useUserContext } from '../Users'
import { User, UserURL } from '../types'
import { FetchStatus, useFetch } from '../../../hooks/useFetch'
import { useEffect } from 'react'
import { Preloader } from '../../../components/Preloader/Preloader'
import { Point } from '../../../components/Point/Point'
import { UsersActionType } from '../reducers/usersReducer'

export default function Table() {
  const {data, status} = useFetch<User[]>(UserURL.AllUsers)
  const {usersDispatch, usersState: {users, selectAllUsers}, profileState: {editMode}} = useUserContext()

  useEffect(() => {
    if (data) {
      usersDispatch({type: UsersActionType.SetData, payload: data})
    }
  }, [usersDispatch, data])

  useEffect(() => {
    usersDispatch({type: UsersActionType.ShowDropActions, payload: users.filter(user => user.selected).length})
  }, [usersDispatch, users])

  function selectUsers(id: string) {
    return function() {
      usersDispatch({type: UsersActionType.SelectUsers, payload: id})
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
        {users.map(user => {
          const { _id, name, surname, email, selected, img } = user
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
                  <img src={img} alt="" />
                </div>
                <div className={styles.column}>
                  <Point value={_id} editMode={false}/>
                </div>
                {[name, surname].map(value => {
                  return (
                    <div className={styles.column}>
                      <Point value={value} editMode={selected ? editMode : false}/>
                    </div>
                )})}
                <div className={styles.column}>
                  <Point value={email} editMode={false} />
                </div>
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