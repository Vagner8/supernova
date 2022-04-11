import { Dispatch, ReactElement } from "react"
import { ProfileAction, ProfileState } from "./reducers/profileReducer/profileReducer"
import { UsersAction, UsersState } from "./reducers/usersReducer"

// Types

export interface User {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    selected: boolean
    disabled: boolean
    phone: string
    registration: Date
    address: string
    role: 'admin'
    birth: Date
    img: string
}

export type Personal = Pick<User, 'name' | 'surname' | '_id'>
export type Origin = Pick<User, 'birth' | 'address'>
export type Contacts = Pick<User, 'registration' | 'email' | 'phone'>
export type Settings = Pick<User, 'img' | 'disabled'>

export type Points = 
| Personal
| Origin
| Contacts
| Settings

export enum Todo {
    Edit = 'edit',
    Delete = 'delete',
    New = 'new',
    Copy = 'copy'
}

export interface DropAction {
    name: string
    todo: Todo
    disabled: boolean
    type: DropActionType[]
}

export interface Content {
    Preloader: ReactElement
    Table: ReactElement
}

export interface UseUserContext {
    usersDispatch: Dispatch<UsersAction>
    profileDispatch: Dispatch<ProfileAction>
    usersState: UsersState
    profileState: ProfileState
}

// Enums

export enum DropActionType {
    Balk = 'bulk',
    Single = 'single',
    Always = 'always'
}

export enum UserURL {
    AllUsers = '/users',
    Profile = '/users/profile',
    DeleteUser = '/users/delete',
    PostUser = '/users/post'
}

export interface UserProfileContext {
    selectUserByProfile: SelectUserByProfile
}

export interface SelectUserByProfile {
    (): void 
}

export interface OnClickDropdown {
    (todo: Todo, userIdParam: string | undefined):  () => void
}