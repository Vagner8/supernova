import { ChangeCheckbox } from '../../pages/Users/usersTypes'
import styles from './Checkbox.module.sass'

interface PropsCheckbox {
    id: string
    label?: string
    selected: boolean
    changeCheckbox: ChangeCheckbox
}

export function Checkbox({id, label, selected, changeCheckbox} : PropsCheckbox) {
    return (
        <label
            data-action="selected"
            className={styles.label}
        >
            <input
                type="checkbox"
                checked={selected}
                onChange={changeCheckbox(id)}
            />
            <span>{ label }</span>
        </label>
    )
}