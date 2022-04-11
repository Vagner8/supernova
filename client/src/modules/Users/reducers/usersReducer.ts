import { Reducer } from "react"
import { DropAction, DropActionType, Todo, User } from "../types"

export interface UsersState {
    users: User[]
    selectAllUsers: boolean
    actionlist: DropAction[]
}

export enum UsersActionType {
    SetData = 'SetData',
    SelectUsers = 'SelectUsers',
    SelectOneUser = 'SelectOneUser',
    ShowDropActions = 'ShowDropActions',
}

export interface SelectOneUser {
    type: UsersActionType.SelectOneUser
    payload: string
}

export interface ShowDropActions {
    type: UsersActionType.ShowDropActions
    payload: number
}

export interface SetUserData {
    type: UsersActionType.SetData
    payload: User[]
}

export interface CheckAction {
    type: UsersActionType.SelectUsers
    payload: string
}

export type UsersAction =
| SetUserData
| CheckAction
| ShowDropActions
| SelectOneUser

export const usersInitState: UsersState = {
    users: [],
    selectAllUsers: false,
    actionlist: [
        {name: 'New', todo: Todo.New, disabled: true, type: [DropActionType.Always]},
        {name: 'Edit', todo: Todo.Edit, disabled: true, type: [DropActionType.Balk, DropActionType.Single]},
        {name: 'Copy', todo: Todo.Copy, disabled: true, type: [DropActionType.Single]},
        {name: 'Delete', todo: Todo.Delete, disabled: true, type: [DropActionType.Balk, DropActionType.Single]}
    ]
}

export const usersReducer: Reducer<UsersState, UsersAction> = (state, action) => {
    switch (action.type) {
        case UsersActionType.SetData:
            return {
                ...state,
                users: action.payload
            }
        case UsersActionType.SelectUsers:
            if (action.payload === 'all') {
                return {
                    ...state,
                    selectAllUsers: !state.selectAllUsers,
                    users: state.users?.map(user => {
                        return {
                            ...user,
                            selected: !state.selectAllUsers
                        }
                    })
                }
            }
            return {
                ...state,
                selectAllUsers: false,
                users: state.users?.map(user => {
                    if (user._id === action.payload) {
                        return {
                            ...user,
                            selected: !user.selected
                        }
                    }
                    return user
                })
            }
        case UsersActionType.SelectOneUser:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.payload) {
                        return {
                            ...user,
                            selected: user.selected = true
                        }
                    }
                    return {
                        ...user,
                        selected: user.selected = false
                    }
                }),
                selectAllUsers: false
            }
        case UsersActionType.ShowDropActions:
            if (action.payload === 0) {
                return {
                    ...state,
                    actionlist: showDropActions(DropActionType.Always, state.actionlist)
                }
            }
            if (action.payload > 1) {
                return {
                    ...state,
                    actionlist: showDropActions(DropActionType.Balk, state.actionlist)
                }
            }
            
            return {
                ...state,
                actionlist: showDropActions(DropActionType.Single, state.actionlist)
            }
        default:
            return state
    }
}

function showDropActions(actionType: DropActionType, actionlist: DropAction[]): DropAction[] {
    return actionlist.map(action => {
        if (action.type.includes(DropActionType.Always) || action.type.includes(actionType)) {
            return { ...action, disabled: false }
        }
        return { ...action, disabled: true }
    })
}