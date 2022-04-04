import { Reducer } from "react"
import { Action, StateUsers, UsersActionTypes, } from "./usersReducerTypes"

export const initialState: StateUsers = {
    users: [],
    checkedAll: false,
    dropdownlist: [
        {title: 'New', action: 'new', disabled: true, actionType: 'always'},
        {title: 'Edit', action: 'edit', disabled: true, actionType: 'single'},
        {title: 'Delete', action: 'delete', disabled: true, actionType: 'bulk'}
    ]
}

export const usersReducer: Reducer<StateUsers, Action> = (state, action) => {
    switch (action.type) {
        case UsersActionTypes.SetData:
            return {
                ...state,
                users: action.payload
            }
        case UsersActionTypes.Check:
            if (action.payload === 'all') {
                return {
                    ...state,
                    checkedAll: !state.checkedAll,
                    users: state.users?.map(user => {
                        return {
                            ...user,
                            checked: !state.checkedAll
                        }
                    })
                }
            }
            return {
                ...state,
                checkedAll: false,
                users: state.users?.map(user => {
                    if (user._id === action.payload) {
                        return {
                            ...user,
                            checked: !user.checked
                        }
                    }
                    return user
                })
            }
        case UsersActionTypes.ShowDropItems:
            if (action.payload === 0) {
                return {
                    ...state,
                    dropdownlist: state.dropdownlist.map(user => {
                        if (user.actionType === 'always') {
                            return {
                                ...user,
                                disabled: false
                            }
                        }
                        return {
                            ...user,
                            disabled: true
                        }
                    })
                }
            }
            if (action.payload > 1) {
                return {
                    ...state,
                    dropdownlist: state.dropdownlist.map(user => {
                        if (user.actionType === 'always' || user.actionType === 'bulk') {
                            return {
                                ...user,
                                disabled: false
                            }
                        }
                        return {
                            ...user,
                            disabled: true
                        }
                    })
                }
            }
            
            return {
                ...state,
                dropdownlist: state.dropdownlist.map(user => {
                    return {
                        ...user,
                        disabled: false
                    }
                })
            }
        default:
            return state
    }
}