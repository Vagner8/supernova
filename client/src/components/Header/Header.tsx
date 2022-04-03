// import { Checkbox } from '../Checkbox/Checkbox'
import { Dropdown } from '../Dropdown/Dropdown'

import styles from './Header.module.sass'

// interface PropsHeader {
//     onChange: (id: string) => () => void
// }

export function Header() {

    return (
        <nav className={styles.nav}>
            <div className={`${styles.wrapper} nav-wrapper`}>
                {/* <Checkbox
                    id="all"
                    onChange={onChange}
                /> */}
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