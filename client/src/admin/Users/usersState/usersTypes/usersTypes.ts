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
  users: User[];
  dropList: DropItem[];
  profile: User | null;
  isAllUsersSelected: boolean;
  editMode: boolean;
}

export type Personal = Pick<User, 'name' | 'surname' | '_id'>;
export type Origin = Pick<User, 'birth' | 'address'>;
export type Contacts = Pick<User, 'registration' | 'email' | 'phone'>;
export type Settings = Pick<User, 'img' | 'disabled'>;

export type Points = Personal | Origin | Contacts;

export interface Content {
  Preloader: ReactElement;
  Table: ReactElement;
}

export interface ShowDropItems {
  (dropList: DropItem[]): DropItem[];
}
