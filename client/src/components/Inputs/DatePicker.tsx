import { FormEvent, memo, useLayoutEffect, useRef } from "react"

interface Props {
  name: string
  value: string
  onChangeInput: (e: FormEvent<HTMLInputElement>) => void
}

export const DatePicker = memo(({value, name} : Props) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (ref.current) {
      M.Datepicker.init(ref.current, {
        defaultDate: new Date(value),
        setDefaultDate: true
      })
    }
  }, [])

  return (
    <input ref={ref} name={name} type="text" className="datepicker" />
  )
})