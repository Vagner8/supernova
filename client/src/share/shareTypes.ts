import { ChangeEvent, MouseEvent } from 'react';

export interface ClickHandler {
  (e: MouseEvent<HTMLButtonElement>): void;
}

export interface ChangeHandler {
    (e: ChangeEvent<HTMLInputElement>): void;
}
