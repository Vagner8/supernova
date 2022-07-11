import { InputMemo, LabelText, Select } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Dispatch, Fragment, ReactNode } from 'react';
import {
  EventsReducerActions,
  EventsState,
  ProfilesType,
} from 'admin/Events/eventsState';
import { OperationResultType } from '../../../../common/src/operationResultType';
import { UserRequiredFields } from '../../../../common/src/userTypes';
import { useEventsSelector } from 'hooks';

interface FormProps {
  popup: EventsState['popup'];
  profile: ProfilesType;
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
  profile,
  editMode,
  onChange,
  eventsDispatch,
  validateErrors,
}: FormProps) {
  const { selectFieldErrorByLabel, selectProfilePoints } = useEventsSelector();
  if (!profile) return null;
  const profilePoints = selectProfilePoints(profile);
  return (
    <form className={styles.Form}>
      {profilePoints.map(([pointName, point]) => {
        return (
          <div key={pointName} className={styles[pointName]}>
            <h6 className={styles.form_name}>{pointName}</h6>
            <div className={styles.form_wrapper}>
              {Object.entries(point).map(([label, valueText]) => {
                const error = selectFieldErrorByLabel(label, validateErrors);
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
                              pointName={pointName}
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
                      return <LabelText label={label} text={valueText} />;
                    }}
                  />
                );
              })}
            </div>
          </div>
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
