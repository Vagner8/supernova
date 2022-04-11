import { FormEvent, memo, useLayoutEffect, useState } from "react"

interface Props {
  name?: string
  initialValue: string
}

export const TextInput = memo(({name, initialValue} : Props) => {
  const [value, setValue] = useState(initialValue)

  useLayoutEffect(() => {
    M.updateTextFields()
  }, [])

  function onChange(e: FormEvent<HTMLInputElement>) {
    setValue(() => (e.target as HTMLInputElement).value)
  }

  return (
    <form>
      <div className="input-field">
        <input
          className='validate'
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
          <label htmlFor="first_name">{name}</label>
          {/* <span className="helper-text" data-error="wrong" data-success="right"></span> */}
      </div>
    </form>
  )
})