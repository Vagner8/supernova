import {
  AdminReducerActions,
  AdminStrAction,
  EventResult,
} from 'admin/adminReducer';
import { Dispatch, useEffect } from 'react';
import { Icon } from 'UIKit';
import styles from './snackbar.module.css';

interface SnackbarProps {
  eventResult: EventResult | null;
  adminDispatch: Dispatch<AdminReducerActions>;
}

let started: boolean = false;
let timer: any;

export function Snackbar({ eventResult, adminDispatch }: SnackbarProps) {
  const icons: {
    ok: 'task_alt';
    error: 'error';
    warning: 'warning';
  } = {
    ok: 'task_alt',
    error: 'error',
    warning: 'warning',
  };

  useEffect(() => {
    const go = () => {
      started = true;
      timer = setTimeout(() => {
        if (eventResult?.status === 'error') return;
        adminDispatch({
          type: AdminStrAction.SaveEventResult,
          payload: { eventResult: null },
        });
        started = false;
      }, 3000);
    };
    if (!started) return go();
    clearTimeout(timer);
    go();
  }, [adminDispatch, eventResult?.status]);

  if (!eventResult) return null;

  const onClick = () => {
    adminDispatch({
      type: AdminStrAction.SaveEventResult,
      payload: { eventResult: null },
    });
  };

  return (
    <div className={`${styles.Snackbar} ${styles[eventResult.status]}`}>
      <Icon icon={icons[eventResult.status]} />
      <p className={styles.message}>{eventResult.message}</p>
      <button onClick={onClick} className={styles.button}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
