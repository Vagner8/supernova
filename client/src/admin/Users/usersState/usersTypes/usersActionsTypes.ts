import { User } from '.';
import { UsersForTable } from './usersTypes';

export enum UsersActionType {
  SetUsersForTable = 'SetUsersForTable',
  SetFetching = 'SetFetching',
  SaveError = 'SaveError',
  SelectionUsers = 'SelectionUsers',
  MassSelection = 'TableMassSelection',
  SwitchUserStatus = 'SwitchUserStatus'
}

export interface TableSetData {
  type: UsersActionType.SetUsersForTable;
  payload: { usersForTable: UsersForTable[] };
}

export interface TableItemsSelection {
  type: UsersActionType.SelectionUsers;
  payload: { id: string };
}

export interface UsersMassSelection {
  type: UsersActionType.MassSelection;
}

export interface SetFetching {
  type: UsersActionType.SetFetching;
  payload: { isFetching: boolean };
}

export interface SaveError {
  type: UsersActionType.SaveError;
  payload: { isError: Error };
}

export interface SwitchUserStatus {
  type: UsersActionType.SwitchUserStatus;
  payload: { userId: string };
}

type UsersActions =
  | TableSetData
  | TableItemsSelection
  | UsersMassSelection
  | SetFetching
  | SaveError
  | SwitchUserStatus;

export enum DropListActionType {
  AdjustDropList = 'AdjustDropList',
  ToggleEditMode = 'ToggleEditMode',
}

export interface AdjustDropList {
  type: DropListActionType.AdjustDropList;
  payload: { numberSelectedUsers: number };
}

export interface ToggleEditMode {
  type: DropListActionType.ToggleEditMode;
  payload: { id: string };
}

type DropListActions = AdjustDropList | ToggleEditMode;

export enum ProfileActionType {
  SetData = 'ProfileSetData',
}

export interface SetProfileData {
  type: ProfileActionType.SetData;
  payload: User;
}
type ProfileActions = SetProfileData;

export type UsersReducerActions =
  | UsersActions
  | ProfileActions
  | DropListActions;
