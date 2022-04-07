import { Dropdown } from '../../../components/Dropdown/Dropdown'
import { DropAction } from '../types'
import styles from './Header.module.sass'

interface Props {
    actionlist: DropAction[]
}

export function Header({actionlist} : Props) {
    return (
        <nav className={styles.nav}>
            <div className={`${styles.wrapper} nav-wrapper`}>
                <Dropdown
                    title="Setting"
                    items={actionlist}
                />
            </div>
        </nav>
    )
}