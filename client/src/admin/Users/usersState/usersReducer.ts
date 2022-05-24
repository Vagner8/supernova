import { Reducer } from 'react';
import { adjustDropList } from './actionHandlers/dropListActionHandlers';
import {
  DropListActionType,
  ProfileActionType,
  UsersActionType,
  Todo,
  UsersReducerActions,
  UsersState,
} from './usersTypes';

export const usersInitState: UsersState = {
  usersForTable: undefined,
  dropList: [
    {
      _id: '625a8ba08e3031cf45cf1565',
      todo: Todo.New,
      disabled: false,
      always: true,
    },
    {
      _id: '625a8c5a8e3031cf45cf1566',
      todo: Todo.Edit,
      disabled: true,
      bulk: true,
      single: true,
    },
    {
      _id: '625a8caf8e3031cf45cf1567',
      todo: Todo.Copy,
      disabled: true,
      single: true,
    },
    {
      _id: '625a8cbb8e3031cf45cf1568',
      todo: Todo.Delete,
      disabled: true,
      single: true,
      bulk: true,
    },
  ],
  isAllUsersSelected: false,
  editMode: false,
  isFetching: false,
  isError: false,
};

export const usersReducer: Reducer<UsersState, UsersReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case UsersActionType.SetUsersForTable:
      return {
        ...state,
        usersForTable: action.payload.usersForTable,
      };
    case UsersActionType.SetFetching:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    case UsersActionType.SaveError:
      return {
        ...state,
        isError: action.payload.isError,
      };
    case UsersActionType.SelectionUsers:
      if (action.payload.id === 'all') {
        return {
          ...state,
          isAllUsersSelected: !state.isAllUsersSelected,
          usersForTable: state.usersForTable?.map((user) => ({
            ...user,
            selected: !state.isAllUsersSelected,
          })),
        };
      }
      return {
        ...state,
        isAllUsersSelected: false,
        usersForTable: state.usersForTable?.map((user) => {
          if (user.userId === action.payload.id) {
            return {
              ...user,
              selected: !user.selected,
            };
          }
          return user;
        }),
      };
    case UsersActionType.SwitchUserStatus:
      return {
        ...state,
        usersForTable: state.usersForTable?.map(user => {
          if (user.userId === action.payload.userId) {
            return {
              ...user,
              disabled: !user.disabled
            }
          }
          return user
        })
      }
    case DropListActionType.AdjustDropList:
      return adjustDropList(state, action.payload.numberSelectedUsers);
    case DropListActionType.ToggleEditMode:
      if (action.payload.id.match(new RegExp(Todo.Edit, 'i'))) {
        return {
          ...state,
          editMode: !state.editMode,
        };
      }
      return state;
    case ProfileActionType.SetData:
      return {
        ...state,
        users: [action.payload],
      };
    default:
      return state;
  }
};
