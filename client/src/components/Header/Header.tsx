import { Checkbox } from '../Checkbox/Checkbox'
import { Dropdown } from '../Dropdown/Dropdown'
import { DropdownItem } from '../../reducers/usersReducer/usersReducerTypes'
import { ChangeCheckbox, ClickDropdown } from '../../pages/Users/usersTypes'

import styles from './Header.module.sass'

interface PropsHeader {
    changeCheckbox: ChangeCheckbox
    clickDropdown: ClickDropdown
    checkedAll: boolean
    dropdownlist: DropdownItem[]
}

export function Header(
    {
        dropdownlist,
        checkedAll,
        changeCheckbox,
        clickDropdown,
    } : PropsHeader
    ) {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.wrapper} nav-wrapper`}>
                <Checkbox
                    id="all"
                    changeCheckbox={changeCheckbox}
                    checked={checkedAll}
                />
                <Dropdown
                    title="Setting"
                    items={dropdownlist}
                    clickDropdown={clickDropdown}
                />
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    )
}