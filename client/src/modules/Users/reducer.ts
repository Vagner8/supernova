import { Reducer } from "react"
import { Action, DropAction, DropActionTypes, StateUsers, ActionTypes } from "./types"

export const initialState: StateUsers = {
    users: [],
    selectAllUsers: false,
    actionlist: [
        {title: 'New', action: 'new', disabled: true, actionType: [DropActionTypes.Always]},
        {title: 'Edit', action: 'edit', disabled: true, actionType: [DropActionTypes.Single]},
        {title: 'Copy', action: 'copy', disabled: true, actionType: [DropActionTypes.Single]},
        {title: 'Delete', action: 'delete', disabled: true, actionType: [DropActionTypes.Balk, DropActionTypes.Single]}
    ]
}

function showDropActions(actionType: DropActionTypes, actionlist: DropAction[]): DropAction[] {
    return actionlist.map(action => {
        if (action.actionType.includes(DropActionTypes.Always) || action.actionType.includes(actionType)) {
            return { ...action, disabled: false }
        }
        return { ...action, disabled: true }
    })
}

export const reducer: Reducer<StateUsers, Action> = (state, action) => {
    switch (action.type) {
        case ActionTypes.SetData:
            return {
                ...state,
                users: action.payload
            }
        case ActionTypes.SelectUsers:
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
        case ActionTypes.SelectOneUser:
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
        case ActionTypes.ShowDropActions:
            if (action.payload === 0) {
                return {
                    ...state,
                    actionlist: showDropActions(DropActionTypes.Always, state.actionlist)
                }
            }
            if (action.payload > 1) {
                return {
                    ...state,
                    actionlist: showDropActions(DropActionTypes.Balk, state.actionlist)
                }
            }
            
            return {
                ...state,
                actionlist: showDropActions(DropActionTypes.Single, state.actionlist)
            }
        default:
            return state
    }
}