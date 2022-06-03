import { InputMemo, Point } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Fragment } from 'react';
import { OwnerPII } from 'admin/Profile/profileApi';
import { EventNames, EventsState } from 'admin/Events/eventsReducer';
import { OperationResult } from 'admin/adminReducer';

interface PrintPointsProps {
  data: OwnerPII;
  sort: string[];
  errorField: OperationResult['field'] | undefined;
  errorMessage: OperationResult['message'] | undefined;
  showInputs: boolean;
  inputsOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Form({
  data,
  sort,
  errorField,
  errorMessage,
  showInputs,
  inputsOnChange,
}: PrintPointsProps) {
  return (
    <form className={styles.Form}>
      {sort.map((formName) => (
        <Fragment key={formName}>
          <h6 className={styles.form_name}>{formName}</h6>
          <div className={styles.form_wrapper}>
            {Object.entries(data[formName as keyof typeof data]).map(
              ([keyText, valueText]) => {
                if (keyText === 'avatar') return;
                return (
                  <Fragment key={keyText}>
                    {showInputs ? (
                      <InputMemo
                        type="text"
                        label={keyText}
                        value={valueText}
                        errorField={errorField}
                        errorMessage={errorMessage}
                        formName={formName}
                        onChange={inputsOnChange}
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
