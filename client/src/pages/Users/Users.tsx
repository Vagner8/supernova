import { Header } from "../../components/Header/Header"
import { Preloader } from "../../components/Preloader/Preloader"
import { useFetch } from "../../hooks/useFetch"
import { UserAPI } from "../../types/apiType"
import { User } from "../../types/userType"
import { UserBody } from "./UserBody/UserBody"

import styles from "./Users.module.sass"

export function Users() {
    const users = useFetch<User[]>(UserAPI.All)

    if (!users) return <Preloader/>

    return (
        <div className={styles.users}>
            <Header/>
            <UserBody users={users} />
        </div>
    )
}