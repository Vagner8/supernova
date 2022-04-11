import { useEffect, useRef } from "react"
import { DropAction, OnClickDropdown, Todo } from "../../modules/Users/types"
import { useParams } from "react-router-dom"
import M from 'materialize-css'
import styles from './Dropdown.module.sass'

interface PropsDropdown {
  title: string
  items: DropAction[]
  editMode: boolean
  onClickDropdown: OnClickDropdown
}

export function Dropdown(
  {
    title,
    items,
    editMode,
    onClickDropdown
  }: PropsDropdown
) {
  const ref = useRef<HTMLButtonElement>(null)
  const { userId } = useParams()

  useEffect(() => {
    if (ref.current) {
      M.Dropdown.init(ref.current)
    }
  })

  function setItemName(itemName: string, itemTodo: string) : string {
    if (itemTodo === Todo.Edit) {
      return editMode ? 'Edit off' : 'Edit on'
    }
    return itemName
  }

  return (
    <div className={styles.DropdownComponent}>
      <button ref={ref} className='dropdown-trigger btn' data-target="dropdown1">
        {title}
      </button>

      <ul
        id="dropdown1"
        className='dropdown-content'
      >
        {items.map(item => {
          if (item.disabled) return null
          return (
            <li className={styles.item} onClick={onClickDropdown(item.todo, userId)} key={item.todo} >
              <a href="#!">
                {setItemName(item.name, item.todo)}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}