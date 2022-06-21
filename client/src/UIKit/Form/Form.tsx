import { InputMemo, Point } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Fragment } from 'react';
import { EventsState } from 'admin/Events/eventsReducer';
import { OperationResultType } from '../../../../common/src/operationResultType';

interface PrintPointsProps {
  points: EventsState['points'];
  sort: string[];
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Form({
  points,
  sort,
  editMode,
  onChange,
  validateErrors
}: PrintPointsProps) {
  if (!points) return null;
  return (
    <form className={styles.Form}>
      {sort.map((pointName) => (
        <Fragment key={pointName}>
          <h6 className={styles.form_name}>{pointName}</h6>
          <div className={styles.form_wrapper}>
            {Object.entries(points[pointName as keyof typeof points]).map(
              ([keyText, valueText]) => {
                if (keyText === 'avatar') return;
                return (
                  <Fragment key={keyText}>
                    {editMode ? (
                      <InputMemo
                        type="text"
                        label={keyText}
                        value={valueText}
                        validateErrors={validateErrors}
                        pointName={pointName}
                        onChange={onChange}
                      />
                    ) : (
                      <Point
                        keyText={keyText}
                        valueText={valueText as string}
                      />
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
