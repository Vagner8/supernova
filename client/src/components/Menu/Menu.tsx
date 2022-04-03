import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Menu.module.sass"

export function Menu() {
    const [open, setOpen] = useState(false)
    const menu = [
        { title: 'Home', link: '/', icon: 'home' },
        { title: 'Users', link: 'users', icon: 'person' },
        { title: 'Settings', link: 'settings', icon: 'settings' }
    ]

    function onClick() {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <nav className={ `${styles.nav} ${open ? styles.open : false}` }>
            <div className="nav-wrapper">
            <i onClick={onClick} className={ `${styles.burger} material-icons` }>dehaze</i>
                <ul className={ styles.list }>
                    {menu.map(item => {
                        const { title, link, icon } = item
                        return (
                            <li key={title} className={ styles.page }>
                                <Link className={ styles.link } to={ link }>
                                    <i className="material-icons">{ icon }</i>
                                    <span className={styles.title}>{ title }</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}