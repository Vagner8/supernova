import { Reducer } from 'react';
import { adjustDropList } from './actionHandlers/dropListActionHandlers';
import {
  DropListActionType,
  ProfileActionType,
  TableActionType,
  Todo,
  UsersReducerActions,
  UsersState,
} from './usersTypes';

export const usersInitState: UsersState = {
  users: [],
  dropList: [],
  profile: null,
  isAllUsersSelected: false,
  editMode: false,
};

export const usersReducer: Reducer<UsersState, UsersReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case TableActionType.SetData:
      return {
        ...state,
        ...action.payload,
      };
    case TableActionType.SelectionUsers:
      const { id } = action.payload;
      if (id === 'all') {
        return {
          ...state,
          isAllUsersSelected: !state.isAllUsersSelected,
          users: state.users?.map((user) => ({
            ...user,
            selected: !state.isAllUsersSelected,
          })),
        };
      }
      return {
        ...state,
        isAllUsersSelected: false,
        users: state.users?.map((user) => {
          if (user._id === action.payload.id) {
            return {
              ...user,
              selected: !user.selected,
            };
          }
          return user;
        }),
      };
    case TableActionType.SelectOne:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload) {
            return {
              ...user,
              selected: (user.selected = true),
            };
          }
          return {
            ...user,
            selected: (user.selected = false),
          };
        }),
      };
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
        profile: action.payload,
      };
    default:
      return state;
  }
};
