import { ReactElement } from "react"
import { Actionlist } from "../../reducers/usersReducer/usersReducerTypes"

export interface User {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    selected: boolean
    action?: string[]
}

export interface ChangeCheckbox {
    (id: string): () => void
}

export interface ClickDropdown {
    (action: Actionlist['action']): () => void
}

export interface Content {
    Preloader: ReactElement
    Table: ReactElement
    UserProfile: ReactElement
}

export interface UserProfileContext {
    selectUserByProfile: SelectUserByProfile
}

export interface SelectUserByProfile {
    (id: string): void 
}