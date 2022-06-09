import { InputMemo, Point } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Fragment } from 'react';
import { OperationResult } from 'admin/adminReducer';
import { EventsState } from 'admin/Events/eventsReducer';

interface PrintPointsProps {
  points: EventsState['points'];
  sort: string[];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  hideInput: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Form({
  points,
  sort,
  errorField,
  errorMessage,
  hideInput,
  onChange,
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
                    <InputMemo
                      hide={hideInput}
                      type="text"
                      label={keyText}
                      value={valueText}
                      errorField={errorField}
                      errorMessage={errorMessage}
                      pointName={pointName}
                      onChange={onChange}
                    />
                    <Point
                      hide={!hideInput}
                      keyText={keyText}
                      valueText={valueText as string}
                    />
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
