import { FormEvent, useLayoutEffect, useState } from 'react';
import M from 'materialize-css';

interface Props {
  name?: string;
  initialValue: string;
}

export function TextInput({ name, initialValue }: Props) {
  const [value, setValue] = useState(initialValue);

  useLayoutEffect(() => {
    M.updateTextFields();
  }, []);

  function onChange(e: FormEvent<HTMLInputElement>) {
    setValue(() => (e.target as HTMLInputElement).value);
  }

  return (
    <form>
      <div className="input-field">
        <input
          className="validate"
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
        <label htmlFor="first_name">{name}</label>
        {/* <span className="helper-text" data-error="wrong"
         data-success="right"></span> */}
      </div>
    </form>
  );
}

TextInput.defaultProps = {
  name: '',
};
