import { InputMemo, LabelText, Select } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Dispatch, Fragment, ReactNode } from 'react';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsReducer';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { filterValidateErrors } from 'helpers';
import {
  UserRequiredFields,
  UserKeyPoints,
} from '../../../../common/src/userTypes';

interface FormProps {
  popup: EventsState['popup'];
  pointsSort: UserKeyPoints[];
  points: EventsState['points'];
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  eventsDispatch: Dispatch<EventsReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

const requiredFields: UserRequiredFields & string[] = [
  'login',
  'password',
  'email',
  'name',
  'surname',
  'phone',
];

export function Form({
  popup,
  pointsSort,
  points,
  editMode,
  onChange,
  eventsDispatch,
  validateErrors,
}: FormProps) {
  if (!points) return null;
  return (
    <form className={styles.Form}>
      {pointsSort.map((pointName) => {
        if (!points[pointName]) return;
        return (
          <Fragment key={pointName}>
            <h6 className={styles.form_name}>{pointName}</h6>
            <div className={styles.form_wrapper}>
              {Object.entries(points[pointName]).map(([label, valueText]) => {
                if (label === 'avatar') return;
                const error = filterValidateErrors(label, validateErrors);
                return (
                  <Point
                    key={label}
                    render={() => {
                      if (editMode) {
                        if (label === 'rule') {
                          return (
                            <Select
                              selectList={['Admin', 'User', 'Viewer', 'Fired']}
                              label={label}
                              value={valueText}
                              popup={popup}
                              pointName={
                                pointName as keyof EventsState['points']
                              }
                              eventsDispatch={eventsDispatch}
                            />
                          );
                        }
                        return (
                          <InputMemo
                            type={label === 'password' ? 'password' : 'text'}
                            label={label}
                            value={valueText}
                            pointName={pointName}
                            onChange={onChange}
                            fieldError={error?.field}
                            messageError={error?.message}
                            required={requiredFields.includes(label)}
                          />
                        );
                      }
                      return (
                        <LabelText label={label} text={valueText} />
                      );
                    }}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </form>
  );
}

interface PointProps {
  render: () => ReactNode;
}

const Point = ({ render }: PointProps) => {
  return <div className={styles.Point}>{render()}</div>;
};
