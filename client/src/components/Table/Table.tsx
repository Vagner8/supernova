import { ChangeCheckbox } from '../../pages/Users/usersTypes'
import { User } from '../../types/userType'
import { Checkbox } from '../Checkbox/Checkbox'

import styles from './Table.module.sass'

interface PropsList {
    items: User[]
    changeCheckbox: ChangeCheckbox
}

export function Table({items, changeCheckbox} : PropsList) {
    return (
        <ul className={`${styles.ul} collection`}>
            {items.map(item => {
                const {_id, name, surname, email, checked} = item
                return (
                    <li key={_id} className={`${styles.item} collection-item`}>
                        <Checkbox
                            id={_id}
                            checked={checked}
                            changeCheckbox={changeCheckbox}
                        />
                        <div>{_id}</div>
                        <div>{name}</div>
                        <div>{surname}</div>
                        <div>{email}</div>
                    </li>
                )
            })}
        </ul>
    )
}