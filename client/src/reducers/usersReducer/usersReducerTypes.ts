import { User } from "../../pages/Users/usersTypes"

export enum UsersActionTypes {
    SetData = 'SetData',
    SelectUsers = 'SelectUsers',
    SelectOneUser = 'SelectOneUser',
    ShowUsersActions = 'ShowUsersActions',
}

export interface SelectOneUser {
    type: UsersActionTypes.SelectOneUser
    payload: string
}

export interface ShowUsersActions {
    type: UsersActionTypes.ShowUsersActions
    payload: number
}

export interface SetDataAction {
    type: UsersActionTypes.SetData
    payload: User[]
}

export interface CheckAction {
    type: UsersActionTypes.SelectUsers
    payload: string
}

export enum ActionType {
    Balk = 'bulk',
    Single = 'single',
    Always = 'always'
}

export interface Actionlist {
    title: string
    action: 'edit' | 'delete' | 'new'
    disabled: boolean
    actionType: ActionType[]
}

export type Action =
| SetDataAction
| CheckAction
| ShowUsersActions
| SelectOneUser

export interface StateUsers {
    users: User[]
    selectAllUsers: boolean
    actionlist: Actionlist[]
}
