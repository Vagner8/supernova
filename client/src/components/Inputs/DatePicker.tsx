import { useLayoutEffect, useRef } from 'react';
import M from 'materialize-css';

interface Props {
  label: string;
  initialValue: string;
}

export function DatePicker({ label, initialValue }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      M.Datepicker.init(ref.current, {
        defaultDate: new Date(initialValue),
        setDefaultDate: true,
      });
    }
  }, [initialValue]);

  return (
    <div className="input-field">
      <input
        id={label}
        ref={ref}
        name={label}
        type="text"
        className="datepicker"
      />
      <label htmlFor={label}>{label}</label>
      {/* <span className="helper-text" data-error="wrong"
     data-success="right"></span> */}
    </div>
  );
}
