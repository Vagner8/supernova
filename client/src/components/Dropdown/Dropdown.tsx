import { useEffect, useRef } from "react"
import M from 'materialize-css'

import './Dropdown.module.sass'

interface PropsDropdown {
    title: string
}

export function Dropdown({title} : PropsDropdown) {
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
                <li data-action="edit">
                    <a href="#!">Edit</a>
                </li>
                <li className="divider"></li>
                <li data-action="delete">
                    <a href="#!">Delete</a>
                </li>
            </ul>
        </>
    )
}