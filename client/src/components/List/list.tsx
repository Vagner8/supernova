import { OnChangeCheckbox } from '../../pages/Users/UserBody/UserBody'
import { User } from '../../types/userType'
import { Checkbox } from '../Checkbox/Checkbox'

import styles from './List.module.sass'

interface PropsList {
    items: User[]
    onChangeCheckbox: OnChangeCheckbox
}

export function List({items, onChangeCheckbox} : PropsList) {
    return (
        <ul className={`${styles.ul} collection`}>
            {items.map(item => {
                const {_id, name, surname, email, checked} = item
                return (
                    <li key={_id} className={`${styles.item} collection-item`}>
                        <Checkbox
                            id={_id}
                            onChangeCheckbox={onChangeCheckbox}
                            checked={checked}
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