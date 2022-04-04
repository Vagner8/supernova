import { User } from "../../types/userType"

export enum UsersActionTypes {
    SetData = 'SetData',
    Check = 'Check',
    ShowDropItems = 'ShowDropItems'
}

export interface ShowDropItems {
    type: UsersActionTypes.ShowDropItems
    payload: number
}

export interface SetDataAction {
    type: UsersActionTypes.SetData
    payload: User[]
}

export interface CheckAction {
    type: UsersActionTypes.Check
    payload: string
}

export interface DropdownItem {
    title: string
    action: 'edit' | 'delete' | 'new'
    disabled: boolean
    actionType: 'bulk' | 'single' | 'always'
}

export type Action =
| SetDataAction
| CheckAction
| ShowDropItems

export interface StateUsers {
    users: User[]
    checkedAll: boolean
    dropdownlist: DropdownItem[]
}
