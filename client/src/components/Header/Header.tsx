import { Dropdown } from '../Dropdown/Dropdown'
import { Actionlist } from '../../reducers/usersReducer/usersReducerTypes'
import { ClickDropdown } from '../../pages/Users/usersTypes'

import styles from './Header.module.sass'

interface PropsHeader {
    clickDropdown: ClickDropdown
    actionlist: Actionlist[]
}

export function Header(
    {
        actionlist,
        clickDropdown,
    } : PropsHeader
    ) {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.wrapper} nav-wrapper`}>
                <Dropdown
                    title="Setting"
                    items={actionlist}
                    clickDropdown={clickDropdown}
                />
                {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul> */}
            </div>
        </nav>
    )
}