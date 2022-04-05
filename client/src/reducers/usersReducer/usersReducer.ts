import { Reducer } from "react"
import { Action, Actionlist, ActionType, StateUsers, UsersActionTypes, } from "./usersReducerTypes"

export const initialState: StateUsers = {
    users: [],
    selectAllUsers: false,
    actionlist: [
        {title: 'New', action: 'new', disabled: true, actionType: [ActionType.Always]},
        {title: 'Edit', action: 'edit', disabled: true, actionType: [ActionType.Single]},
        {title: 'Delete', action: 'delete', disabled: true, actionType: [ActionType.Balk, ActionType.Single]}
    ]
}

function showActions(actionType: ActionType, actionlist: Actionlist[]): Actionlist[] {
    return actionlist.map(action => {
        if (action.actionType.includes(ActionType.Always) || action.actionType.includes(actionType)) {
            return { ...action, disabled: false }
        }
        return { ...action, disabled: true }
    })
}

export const usersReducer: Reducer<StateUsers, Action> = (state, action) => {
    switch (action.type) {
        case UsersActionTypes.SetData:
            return {
                ...state,
                users: action.payload
            }
        case UsersActionTypes.SelectUsers:
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
        case UsersActionTypes.SelectOneUser:
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
        case UsersActionTypes.ShowUsersActions:
            if (action.payload === 0) {
                return {
                    ...state,
                    actionlist: showActions(ActionType.Always, state.actionlist)
                }
            }
            if (action.payload > 1) {
                return {
                    ...state,
                    actionlist: showActions(ActionType.Balk, state.actionlist)
                }
            }
            
            return {
                ...state,
                actionlist: showActions(ActionType.Single, state.actionlist)
            }
        default:
            return state
    }
}