import { Dispatch } from 'react'
import { Dropdown } from '../../../components/Dropdown/Dropdown'
import { ProfileAction, ProfileActionType, ProfileState } from '../reducers/profileReducer/profileReducer'
import { UsersAction } from '../reducers/usersReducer'
import { DropAction, OnClickDropdown } from '../types'
import styles from './Header.module.sass'

interface Props {
  dropdownList: DropAction[]
  profileState: ProfileState
  usersDispatch: Dispatch<UsersAction>
  profileDispatch: Dispatch<ProfileAction>
}

export function Header(
  {
    dropdownList,
    profileState,
    profileDispatch,
  } : Props) {

  const onClickDropdown: OnClickDropdown = () => {
    profileDispatch({type: ProfileActionType.SetEditMode})
    console.log('onClickDropdown')
  }

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} nav-wrapper`}>
        <Dropdown
          title="Actions"
          dropdownList={dropdownList}
          editMode={profileState.editMode}
          onClickDropdown={onClickDropdown}
        />
      </div>
    </nav>
  )
}