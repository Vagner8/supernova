import { DropItem, User } from '.';

export enum TableActionType {
  SetData = 'TableSetData',
  SelectionUsers = 'TableSelection',
  SelectOne = 'TableSelectOne',
  MassSelection = 'TableMassSelection',
}

export interface TableSetData {
  type: TableActionType.SetData;
  payload: {users: User[]; dropList: DropItem[]};
}

export interface TableItemsSelection {
  type: TableActionType.SelectionUsers;
  payload: { id: string };
}

export interface SelectOneUser {
  type: TableActionType.SelectOne;
  payload: string;
}

export interface UsersMassSelection {
  type: TableActionType.MassSelection;
}

type UsersActions =
  | TableSetData
  | TableItemsSelection
  | SelectOneUser
  | UsersMassSelection;

export enum DropListActionType {
  AdjustDropList = 'AdjustDropList',
  ToggleEditMode = 'ToggleEditMode'
}

export interface AdjustDropList {
  type: DropListActionType.AdjustDropList;
  payload: { numberSelectedUsers: number };
}

export interface ToggleEditMode {
  type: DropListActionType.ToggleEditMode;
  payload: {id: string};
}

type DropListActions = AdjustDropList | ToggleEditMode;

export enum ProfileActionType {
  SetData = 'ProfileSetData',
}

export interface SetProfileData {
  type: ProfileActionType.SetData;
  payload: User;
}

type ProfileActions = SetProfileData

export type UsersReducerActions =
  | UsersActions
  | ProfileActions
  | DropListActions;
