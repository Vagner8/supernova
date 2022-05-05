import { ReactElement } from 'react';

export interface User {
  _id: string;
  img: string;
  userId: string;
  name: string;
  surname: string;
  birth: string;

  city: string;
  zip: string;
  street: string;
  numberHouse: string;

  phone: string;
  email: string;

  registration: string;
  role: string;
  selected: boolean;
  disabled: boolean;

  password: string;
}

export type UsersForTable = Pick<
  User,
  | 'userId'
  | 'name'
  | 'surname'
  | 'phone'
  | 'email'
  | 'img'
  | 'selected'
  | 'disabled'
  | 'role'
>;

export enum Todo {
  Edit = 'edit',
  Delete = 'delete',
  New = 'new',
  Copy = 'copy',
}

export enum DropItemTypes {
  Bulk = 'bulk',
  Single = 'single',
  Always = 'always'
}

export interface DropItem {
  _id: string;
  todo: Todo;
  disabled: boolean;
  bulk?: boolean;
  single?: boolean;
  always?: boolean;
}

export interface UsersState {
  usersForTable: UsersForTable[] | undefined;
  dropList: DropItem[];
  isAllUsersSelected: boolean;
  editMode: boolean;
  isFetching: boolean;
  isError: false | Error;
}

export interface Content {
  Preloader: ReactElement;
  Table: ReactElement;
}

export interface ShowDropItems {
  (dropList: DropItem[]): DropItem[];
}
