import {
  AdminReducerActions,
  AdminState,
  switchDrawer,
} from 'admin/adminReducer';
import { Dispatch, useEffect } from 'react';

interface UseWindowClick {
  drawer: AdminState['drawer'];
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function useWindowClick({ adminDispatch, drawer }: UseWindowClick) {
  useEffect(() => {
    function onClick(this: HTMLElement, e: Event) {
      manageDrawer(e.target, drawer, adminDispatch);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [adminDispatch, drawer]);
}

const manageDrawer = (
  target: EventTarget | null,
  drawer: AdminState['drawer'],
  adminDispatch: Dispatch<AdminReducerActions>,
) => {
  if ((target as HTMLElement).getAttribute('data-not-close-drawer')) {
    return
  }
  if ((target as HTMLElement).closest('[data-open-drawer]')) {
    switchDrawer(adminDispatch, 'show');
  }
  if (drawer === 'show') {
    if (!(target as HTMLElement).closest('[data-open-drawer]')) {
      switchDrawer(adminDispatch, 'hide');
    }
  }
};
