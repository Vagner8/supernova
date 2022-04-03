import { OnChangeCheckbox } from '../../pages/Users/UserBody/UserBody'
import { Checkbox } from '../Checkbox/Checkbox'
import { Dropdown } from '../Dropdown/Dropdown'

import styles from './Header.module.sass'

interface PropsHeader {
    checkedAll: boolean
    onChangeCheckbox: OnChangeCheckbox
}

export function Header({checkedAll, onChangeCheckbox} : PropsHeader) {

    return (
        <nav className={styles.nav}>
            <div className={`${styles.wrapper} nav-wrapper`}>
                <Checkbox
                    id="all"
                    onChangeCheckbox={onChangeCheckbox}
                    checked={checkedAll}
                />
                <Dropdown title="Setting"/>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    )
}