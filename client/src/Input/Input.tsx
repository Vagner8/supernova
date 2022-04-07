import { FormEvent, useEffect } from "react"

interface Props {
  label: string
  type: string
  value: string
  placeholder: string
  error: boolean
  onChangeInput: (e: FormEvent<HTMLInputElement>) => void
}

export function Input({label, type, value, error, onChangeInput} : Props) {

  useEffect(() => {
    M.updateTextFields()
  }, [])

  return (
    <form>
      <div className="input-field">
        <input
          id={label}
          type={type}
          value={value}
          className="validate"
          onChange={onChangeInput}
        />
          <label htmlFor="first_name">{label}</label>
          <span className="helper-text" data-error="wrong" data-success="right"></span>
      </div>
    </form>
  )
}

Input.defaultProps = {
  label: 'name',
  type: 'text',
  value: 'Arnold',
  placeholder: 'placeholder',
  error: false,
  onChangeInput: (e: FormEvent<HTMLInputElement>) => {
    console.log(e.target)
  }
}