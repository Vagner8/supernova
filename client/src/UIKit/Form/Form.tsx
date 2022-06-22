import { InputMemo, Point, Select } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Fragment } from 'react';
import { EventsState } from 'admin/Events/eventsReducer';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { filterValidateErrors } from 'helpers';
import { UserKeyPoints } from '../../../../common/src/userTypes';

interface PrintPointsProps {
  popup: EventsState['popup']
  pointsSort: UserKeyPoints[];
  points: EventsState['points'];
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Form({
  popup,
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
                      <InputSpecies
                        popup={popup}
                        label={label}
                        valueText={valueText}
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

interface InputSpeciesProps {
  popup: EventsState['popup'];
  label: string;
  valueText: string;
  pointName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fieldError?: string;
  messageError?: string;
}

const InputSpecies = ({
  popup,
  label,
  valueText,
  pointName,
  onChange,
  fieldError,
  messageError,
}: InputSpeciesProps) => {
  const species = {
    textInput: (
      <InputMemo
        type={label === 'password' ? 'password' : 'text'}
        label={label}
        value={valueText}
        pointName={pointName}
        onChange={onChange}
        fieldError={fieldError}
        messageError={messageError}
      />
    ),
    select: (
      <Select selectList={[]} title={label} popup={popup} onChange={onChange} />
    ),
  };

  return (
    <InputMemo
      type={label === 'password' ? 'password' : 'text'}
      label={label}
      value={valueText}
      pointName={pointName}
      onChange={onChange}
      fieldError={fieldError}
      messageError={messageError}
    />
  );
};
