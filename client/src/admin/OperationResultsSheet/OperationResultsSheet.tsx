import { AdminReducerActions, AdminState } from 'admin/adminReducer';
import { Dispatch } from 'react';
import { Snackbar } from 'UIKit';
import { v4 as uuidv4 } from 'uuid';
import style from './operationResultsSheet.module.css';

interface OperationResultsSheetProps {
  operationResults: AdminState['operationResults'];
  adminDispatch: Dispatch<AdminReducerActions>;
}

export function OperationResultsSheet({
  operationResults,
  adminDispatch,
}: OperationResultsSheetProps) {
  if (!operationResults) return null
  return (
    <div className={style.OperationResultsSheet}>
      {operationResults.map((result, index) => {
        return (
          <div className={style.snackbar_wrap} key={uuidv4()}>
            <Snackbar
              index={index}
              status={result.status}
              message={result.message}
              filed={result.field}
              adminDispatch={adminDispatch}
            />
          </div>
        );
      })}
    </div>
  );
}
