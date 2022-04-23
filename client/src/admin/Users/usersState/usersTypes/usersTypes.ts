import { ReactElement } from 'react';

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  selected: boolean;
  disabled: boolean;
  phone: string;
  registration: string;
  address: string;
  role: string;
  birth: string;
  img: string;
}

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
  users: User[] | undefined;
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
