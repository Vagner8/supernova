import { OnChangeCheckbox } from '../../pages/Users/UserBody/UserBody'
import styles from './Checkbox.module.sass'

interface PropsCheckbox {
    id: string
    label?: string
    checked: boolean
    onChangeCheckbox: OnChangeCheckbox
}

export function Checkbox({id, label, checked, onChangeCheckbox} : PropsCheckbox) {
    return (
        <label
            data-action="selected"
            className={styles.label}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChangeCheckbox(id)}
            />
            <span>{ label }</span>
        </label>
    )
}