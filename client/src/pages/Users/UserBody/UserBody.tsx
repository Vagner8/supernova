import { useState } from "react"
import { List } from "../../../components/List/list"
import { User } from "../../../types/userType"

interface PropsUserBody {
    users: User[]
}

export interface OnChangeCheckbox {
    (id: string): () => void
}

export function UserBody({users} : PropsUserBody) {
    const [adjustedUsers, setAdjustedUsers] = useState(users)

    function onChangeCheckbox(id: string) {
        return function() {
            setAdjustedUsers(prev => {
                return prev.map(user => {
                    if (user._id === id) {
                        return {
                            ...user,
                            checked: !user.checked
                        }
                    }
                    return user
                })
            })
        }
    }

    return (
        <>
            <List
                items={adjustedUsers}
                onChangeCheckbox={onChangeCheckbox}
            />
        </>
    )
}