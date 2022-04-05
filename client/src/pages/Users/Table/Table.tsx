import { ChangeCheckbox, User } from '../usersTypes'
import { Checkbox } from '../../../components/Checkbox/Checkbox'
import { NavLink } from 'react-router-dom'

import styles from './Table.module.sass'

interface PropsList {
  items: User[]
  selectAllUsers: boolean
  changeCheckbox: ChangeCheckbox
}

export function Table({ items, selectAllUsers, changeCheckbox }: PropsList) {
  return (
    <>
      <ul className={`${styles.list} collection`}>
        <li className='collection-item'>
          <Checkbox
            id="all"
            changeCheckbox={changeCheckbox}
            selected={selectAllUsers}
          />
        </li>
        {items.map(item => {
          const { _id, name, surname, email, selected } = item
          return (
            <li key={_id} className={`${styles.item} collection-item`}>
              <div className={styles.left}>
                <Checkbox
                  id={_id}
                  selected={selected}
                  changeCheckbox={changeCheckbox}
                />
              </div>
              <div className={styles.right}>
                <div><i className="material-icons">person</i></div>
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