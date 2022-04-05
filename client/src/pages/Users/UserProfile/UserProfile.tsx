import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserURL } from "../../../api/apiType"
import { Preloader } from "../../../components/Preloader/Preloader"
import { useFetch } from "../../../hooks/useFetch"
import { useUserProfileContext } from "../Users"
import { User } from "../usersTypes"

import styles from './userProfile.module.sass'

export function UserProfile() {
  const {userId} = useParams()
  const user = useFetch<User>(`${UserURL.FetchProfile}?userId=${userId}`)
  const {selectUserByProfile} = useUserProfileContext()
  useEffect(() => {
    if (userId) {
      selectUserByProfile(userId)
    }
  }, [userId, selectUserByProfile])

  if (!user.data) return <Preloader/>

  const {_id} = user.data
  return (
    <div className={styles.user_profile}>
      <div className={styles.left}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rKOUuCLm7NuG_r9LhglmKeecxR0RQ4Ucjw&usqp=CAU" alt="" />
      </div>
      <div className={styles.right}>
        <h3>{_id}</h3>
      </div>
    </div>
  )
}