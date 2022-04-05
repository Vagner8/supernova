import { useEffect, useRef } from "react"
import { ClickDropdown } from "../../pages/Users/usersTypes"
import { Actionlist } from "../../reducers/usersReducer/usersReducerTypes"

import M from 'materialize-css'
import './Dropdown.module.sass'


interface PropsDropdown {
    title: string
    items: Actionlist[]
    clickDropdown: ClickDropdown
}

export function Dropdown(
    {
        title,
        items,
        clickDropdown
    } : PropsDropdown
) {
    const ref = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (ref.current) {
            M.Dropdown.init(ref.current)
        } 
    })

    return (
        <>
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
                        <li key={item.action} onClick={clickDropdown(item.action)}>
                            <a href="#!">
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}