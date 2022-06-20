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
    function onClick(this: Window, e: MouseEvent) {
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
  if (target) {
    if (
      (target as HTMLElement)
        .closest('[data-set]')
        ?.getAttribute('data-set') === 'open-drawer'
    ) {
      return switchDrawer(adminDispatch, 'show');
    }
    if (
      (target as HTMLElement).getAttribute('data-set') === 'not-close-drawer'
    ) {
      return;
    }
  }
  if (drawer === 'show') {
    switchDrawer(adminDispatch, 'hide');
  }
};
