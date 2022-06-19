import {
  AdminReducerActions,
  deleteOperationResult,
  OperationResult,
} from 'admin/adminReducer';
import { Dispatch, useEffect } from 'react';
import { ButtonIcon, Headerblock } from 'UIKit';
import styles from './snackbar.module.css';

export interface SnackbarProps {
  errorName: OperationResult['errorName'];
  status: OperationResult['status'] | undefined;
  message: OperationResult['message'] | undefined;
  filed: OperationResult['field'] | undefined;
  index: number;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Snackbar({
  status,
  message,
  filed,
  index,
  errorName,
  adminDispatch,
}: SnackbarProps) {
  const icons: {
    success: 'task_alt';
    error: 'error';
    warning: 'warning';
  } = {
    success: 'task_alt',
    error: 'error',
    warning: 'warning',
  };

  // useEffect(() => {
  //   if (status !== 'error') {
  //     setTimeout(() => {
  //       deleteOperationResult(adminDispatch, index)
  //     }, 3000)
  //   }
  // }, [adminDispatch, index, status]);

  const onClick = () => {
    deleteOperationResult(adminDispatch, index);
  };

  if (!message || !status || filed) return null;

  return (
    <div className={`${styles.Snackbar} ${styles[status]}`}>
      <Headerblock
        icon={icons[status]}
        title={errorName || status}
        text={message}
      />
      <ButtonIcon icon="close" onClick={onClick} />
    </div>
  );
}
