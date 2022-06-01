import {
  AdminReducerActions,
  AdminStrAction,
  FetchResult,
} from 'admin/adminReducer';
import { Dispatch, useEffect, useState } from 'react';
import { Icon } from 'UIKit';
import styles from './snackbar.module.css';

export interface SnackbarProps {
  status: FetchResult['status'] | undefined;
  message: FetchResult['message'] | undefined;
  filed: FetchResult['field'] | undefined;
  adminDispatch: Dispatch<AdminReducerActions>;
}

let started: boolean = false;
let timer: any;

export function Snackbar({
  status,
  message,
  filed,
  adminDispatch,
}: SnackbarProps) {
  const [show, setShow] = useState(true)
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
        if (status === 'error') return;
        setShow(false)
        started = false;
      }, 3000);
    };
    if (!started) return go();
    clearTimeout(timer);
    go();
  }, [adminDispatch, status]);

  const onClick = () => {
    adminDispatch({
      type: AdminStrAction.DeleteFetchResult,
    });
  };

  if (!message || !status || filed) return null;
  if (!show) return null

  return (
    <div className={`${styles.Snackbar} ${styles[status]}`}>
      <Icon icon={icons[status]} />
      <p className={styles.message}>{message}</p>
      <button onClick={onClick} className={styles.button}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
