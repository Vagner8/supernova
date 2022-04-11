import { Dispatch } from 'react'
import { Dropdown } from '../../../components/Dropdown/Dropdown'
import { ProfileAction, ProfileActionType, ProfileState } from '../reducers/profileReducer/profileReducer'
import { UsersAction, UsersState } from '../reducers/usersReducer'
import { DropAction, OnClickDropdown, Todo } from '../types'
import styles from './Header.module.sass'

interface Props {
  actionlist: DropAction[]
  usersState: UsersState
  profileState: ProfileState
  usersDispatch: Dispatch<UsersAction>
  profileDispatch: Dispatch<ProfileAction>
}

export function Header(
  {
    actionlist,
    usersState,
    profileDispatch,
    profileState
  } : Props) {

  const onClickDropdown: OnClickDropdown = (todo, userIdParam) => {
    return function () {
      profileDispatch({type: ProfileActionType.SetEditMode})
      // if (!userIdParam) {
      //   navigateTo()
      // }
      // console.log('table', usersState.users[0]._id)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} nav-wrapper`}>
        <Dropdown
          title="Actions"
          items={actionlist}
          onClickDropdown={onClickDropdown}
          editMode={profileState.editMode}
        />
      </div>
    </nav>
  )
}