import { useState } from "react"
import { Header } from "../../components/Header/Header"
import { Preloader } from "../../components/Preloader/Preloader"
import { useFetch } from "../../hooks/useFetch"
import { UserAPI } from "../../types/apiType"
import { User } from "../../types/userType"
import { UserBody } from "./UserBody/UserBody"

import styles from "./Users.module.sass"

export function Users() {
    const [trigger, setTrigger] = useState(0)
    const [checkedAll, setCheckedAll] = useState(false)

    const {data, status} = useFetch<User[]>(trigger, UserAPI.All)

    function onChangeCheckbox(id: string) {
        return function() {
            setCheckedAll(!checkedAll)
        }
    }

    return (
        <div className={styles.users}>
            <Header
                checkedAll={checkedAll}
                onChangeCheckbox={onChangeCheckbox}
            />
            {(data && status === 'fulfilled')
            ? <UserBody
                checkedAll={checkedAll}
                users={data}
            />
            : <Preloader/>}
        </div>
    )
}