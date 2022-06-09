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
  console.log(operationResults);
  return (
    <div className={style.OperationResultsSheet}>
      <h1>OperationResultsSheet</h1>
      {operationResults.map((result) => (
        <Snackbar
          key={uuidv4()}
          status={result.status}
          message={result.message}
          filed={result.field}
          adminDispatch={adminDispatch}
        />
      ))}
    </div>
  );
}
