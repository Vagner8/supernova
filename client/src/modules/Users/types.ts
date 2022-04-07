import { ReactElement } from "react"

// Types

export interface User {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    selected: boolean
    action?: string[]
    phone: string
    registration: Date
    address: string
    role: 'admin'
    birth: Date
    img: string
}

export interface DropAction {
    title: string
    action: 'edit' | 'delete' | 'new'
    disabled: boolean
    actionType: DropActionTypes[]
}

export interface Content {
    Preloader: ReactElement
    Table: ReactElement
}

export interface UseUserContext {
    dispatch: React.Dispatch<Action>
    state: StateUsers
}

export type Action =
| SetDataAction
| CheckAction
| ShowDropActions
| SelectOneUser

// Enums

export enum ActionTypes {
    SetData = 'SetData',
    SelectUsers = 'SelectUsers',
    SelectOneUser = 'SelectOneUser',
    ShowDropActions = 'ShowDropActions',
}

export enum DropActionTypes {
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

// ActionTypes

export interface SelectOneUser {
    type: ActionTypes.SelectOneUser
    payload: string
}

export interface ShowDropActions {
    type: ActionTypes.ShowDropActions
    payload: number
}

export interface SetDataAction {
    type: ActionTypes.SetData
    payload: User[]
}

export interface CheckAction {
    type: ActionTypes.SelectUsers
    payload: string
}

// Reducer

export interface StateUsers {
    users: User[]
    selectAllUsers: boolean
    actionlist: DropAction[]
}

// Functions

export interface ClickDropdown {
    (action: DropAction['action']): () => void
}

export interface UserProfileContext {
    selectUserByProfile: SelectUserByProfile
}

export interface SelectUserByProfile {
    (): void 
}