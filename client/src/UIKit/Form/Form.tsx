import { InputMemo, Point } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Fragment } from 'react';
import { EventsState } from 'admin/Events/eventsReducer';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { filterValidateErrors } from 'helpers';
import { UserKeyPoints } from '../../../../common/src/userTypes';

interface PrintPointsProps {
  pointsSort: UserKeyPoints[]
  points: EventsState['points'];
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Form({
  pointsSort,
  points,
  editMode,
  onChange,
  validateErrors,
}: PrintPointsProps) {
  if (!points) return null;
  return (
    <form className={styles.Form}>
      {pointsSort.map((pointName) => (
        <Fragment key={pointName}>
          <h6 className={styles.form_name}>{pointName}</h6>
          <div className={styles.form_wrapper}>
            {Object.entries(points[pointName as keyof typeof points]).map(
              ([label, valueText]) => {
                if (label === 'avatar') return;
                const error = filterValidateErrors(label, validateErrors);
                return (
                  <Fragment key={label}>
                    {editMode ? (
                      <InputMemo
                        type="text"
                        label={label}
                        value={valueText}
                        pointName={pointName}
                        onChange={onChange}
                        fieldError={error?.field}
                        messageError={error?.message}
                      />
                    ) : (
                      <Point label={label} text={valueText as string} />
                    )}
                  </Fragment>
                );
              },
            )}
          </div>
        </Fragment>
      ))}
    </form>
  );
}
