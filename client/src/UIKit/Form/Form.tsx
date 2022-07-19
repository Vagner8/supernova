import { InputMemo, LabelText, Select } from 'UIKit';
import styles from './form.module.css';
import { ChangeEvent, Dispatch, ReactNode } from 'react';
import {
  EventsReducerActions,
  EventsState,
  ProfileType,
} from 'admin/Events/eventsState';
import { useEventsSelector } from 'hooks';
import { OperationResultType } from '../../../../common/src/commonTypes';
import { useFields } from './formHooks/usFields';

interface FormProps {
  popup: EventsState['popup'];
  profile: ProfileType;
  editMode: EventsState['editMode'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  eventsDispatch: Dispatch<EventsReducerActions>;
  validateErrors?: OperationResultType['validateErrors'];
}

export function Form({
  popup,
  profile,
  editMode,
  onChange,
  eventsDispatch,
  validateErrors,
}: FormProps) {
  const { selectFieldErrorByLabel, selectProfilePoints } = useEventsSelector();
  const {
    requiredFields,
    getSelectList,
    isTextareaField,
    isPasswordField,
    isLabelPartialValidatedFieldsType,
  } = useFields();
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
                if (!isLabelPartialValidatedFieldsType(label)) return;
                const error = selectFieldErrorByLabel(label, validateErrors);
                return (
                  <Point
                    key={label}
                    render={() => {
                      if (editMode) {
                        if (label === 'rule' || label === 'category') {
                          return (
                            <Select
                              selectList={getSelectList(label)}
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
                            type={isPasswordField(label)}
                            label={label}
                            value={valueText}
                            pointName={pointName}
                            isTextareaField={isTextareaField(label)}
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
