import { AdminReducerActions } from 'admin/adminState';
import { useAdminDispatch } from 'hooks';
import { Dispatch, useEffect } from 'react';
import { ButtonIcon, Headerblock } from 'UIKit';
import { OperationResultType } from '../../../../common/src/operationResultType';
import styles from './snackbar.module.css';

export interface SnackbarProps {
  status: OperationResultType['status'] | undefined;
  message: OperationResultType['message'] | undefined;
  index: number;
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function Snackbar({
  status,
  message,
  index,
  adminDispatch,
}: SnackbarProps) {
  const adminAction = useAdminDispatch(adminDispatch);

  const setIcon = (statusProp: string | undefined) => {
    if (!statusProp) return 'error';
    if (statusProp.match(/error/i)) return 'error';
    if (statusProp.match(/warning/i)) return 'warning';
    if (statusProp.match(/success/i)) return 'task_alt';
    return 'error';
  };

  useEffect(() => {
    if (!status?.match(/error/i)) {
      setTimeout(() => {
        adminAction.deleteOperationResult({ index });
      }, 3000);
    }
  }, [adminDispatch, index, status, adminAction]);

  const onClick = () => adminAction.deleteOperationResult({ index });

  if (!message || !status || status === 'validate error') return null;

  return (
    <div className={`${styles.Snackbar} ${styles[setIcon(status)]}`}>
      <Headerblock icon={setIcon(status)} title={status} text={message} />
      <ButtonIcon icon="close" onClick={onClick} />
    </div>
  );
}
