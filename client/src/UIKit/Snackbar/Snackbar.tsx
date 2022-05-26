import {
  AdminReducerActions,
  AdminStrAction,
  Loading,
} from 'admin/adminReducer';
import { Dispatch, useEffect } from 'react';
import { Icon } from 'UIKit';
import styles from './snackbar.module.css';

interface SnackbarProps {
  loading: Loading | null;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Snackbar({ loading, adminDispatch }: SnackbarProps) {
  const icons: { ok: 'task_alt'; error: 'error'; warning: 'warning' } = {
    ok: 'task_alt',
    error: 'error',
    warning: 'warning',
  };

  useEffect(() => {
    if (loading?.type === 'error') return
    setTimeout(() => {
      adminDispatch({ type: AdminStrAction.SaveLoading, payload: null });
    }, 3000);
  }, [adminDispatch, loading?.type]);

  if (!loading) return null;

  const onClick = () => {
    adminDispatch({ type: AdminStrAction.SaveLoading, payload: null });
  };

  return (
    <div className={`${styles.Snackbar} ${styles[loading.type]}`}>
      <Icon icon={icons[loading.type]} />
      <p className={styles.message}>{loading.message}</p>
      <button onClick={onClick} className={styles.button}>
        <Icon icon="close" />
      </button>
    </div>
  );
}
