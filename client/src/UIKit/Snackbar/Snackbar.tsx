import {
  AdminReducerActions,
  AdminStrAction,
  deleteOperationResult,
  OperationResult,
} from 'admin/adminReducer';
import { capitalizer } from 'helpers';
import { Dispatch, useEffect } from 'react';
import { Icon } from 'UIKit';
import styles from './snackbar.module.css';

export interface SnackbarProps {
  status: OperationResult['status'] | undefined;
  message: OperationResult['message'] | undefined;
  filed: OperationResult['field'] | undefined;
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
        // deleteOperationResult(adminDispatch);
        started = false;
      }, 3000);
    };
    if (!started) return go();
    clearTimeout(timer);
    go();
  }, [adminDispatch, status]);

  const onClick = () => {
    adminDispatch({
      type: AdminStrAction.DeleteOperationResult,
    });
  };

  if (!message || !status || filed) return null;

  return (
    <div className={`${styles.Snackbar} ${styles[status]}`}>
      <Icon icon={icons[status]} />
      <p className={styles.message}>
        {capitalizer({index: 0, str: message})}
      </p>
      <button onClick={onClick} className={styles.button}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
