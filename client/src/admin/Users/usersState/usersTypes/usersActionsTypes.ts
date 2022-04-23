import { User } from '.';

export enum UsersActionType {
  SetData = 'TableSetData',
  SetFetching = 'SetFetching',
  SetError = 'SetError',
  SelectionUsers = 'SelectionUsers',
  MassSelection = 'TableMassSelection',
}

export interface TableSetData {
  type: UsersActionType.SetData;
  payload: { users: User[] };
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

export interface SetError {
  type: UsersActionType.SetError;
  payload: { isError: Error };
}

type UsersActions =
  | TableSetData
  | TableItemsSelection
  | UsersMassSelection
  | SetFetching
  | SetError;

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
