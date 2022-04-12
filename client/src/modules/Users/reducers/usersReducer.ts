import { Reducer } from 'react';
import {
  DropAction, DropActionType, Todo, User,
} from '../types';

export interface UsersState {
    users: User[]
    selectAllUsers: boolean
    dropdownList: DropAction[]
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
  dropdownList: [
    { todo: Todo.New, disabled: false, type: [DropActionType.Always] },
    { todo: Todo.Edit, disabled: false, type: [DropActionType.Balk, DropActionType.Single] },
    { todo: Todo.Copy, disabled: false, type: [DropActionType.Single] },
    { todo: Todo.Delete, disabled: false, type: [DropActionType.Balk, DropActionType.Single] },
  ],
};

export const usersReducer: Reducer<UsersState, UsersAction> = (state, action) => {
  switch (action.type) {
    case UsersActionType.SetData:
      return {
        ...state,
        users: action.payload,
      };
    case UsersActionType.SelectUsers:
      if (action.payload === 'all') {
        return {
          ...state,
          selectAllUsers: !state.selectAllUsers,
          users: state.users?.map((user) => ({
            ...user,
            selected: !state.selectAllUsers,
          })),
        };
      }
      return {
        ...state,
        selectAllUsers: false,
        users: state.users?.map((user) => {
          if (user._id === action.payload) {
            return {
              ...user,
              selected: !user.selected,
            };
          }
          return user;
        }),
      };
    case UsersActionType.SelectOneUser:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload) {
            return {
              ...user,
              selected: user.selected = true,
            };
          }
          return {
            ...user,
            selected: user.selected = false,
          };
        }),
        selectAllUsers: false,
      };
    case UsersActionType.ShowDropActions:
      if (action.payload === 0) {
        return {
          ...state,
          dropdownList: showDropActions(DropActionType.Always, state.dropdownList),
        };
      }
      if (action.payload > 1) {
        return {
          ...state,
          dropdownList: showDropActions(DropActionType.Balk, state.dropdownList),
        };
      }

      return {
        ...state,
        dropdownList: showDropActions(DropActionType.Single, state.dropdownList),
      };
    default:
      return state;
  }
};

function showDropActions(actionType: DropActionType, dropdownList: DropAction[]): DropAction[] {
  return dropdownList.map((action) => {
    if (action.type.includes(DropActionType.Always) || action.type.includes(actionType)) {
      return { ...action, disabled: false };
    }
    return { ...action, disabled: true };
  });
}
