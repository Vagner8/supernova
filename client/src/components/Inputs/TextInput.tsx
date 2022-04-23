import { useLayoutEffect, useState } from 'react';
import M from 'materialize-css';
import { ChangeHandler } from '../../share/shareTypes';

interface Props {
  label: string;
  initialValue: string;
}

export function TextInput({ label, initialValue }: Props) {
  const [value, setValue] = useState(initialValue);

  useLayoutEffect(() => {
    M.updateTextFields();
  }, []);

  const onChange: ChangeHandler = ({ target }) => {
    if (target) {
      setValue(() => target.value);
    }
  };

  return (
    <div className="input-field">
      <input
        id={label}
        className="validate"
        name={label}
        type="text"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
      {/* <span className="helper-text" data-error="wrong"
     data-success="right"></span> */}
    </div>
  );
}
