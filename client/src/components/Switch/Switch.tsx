import styles from './Switch.module.sass'

interface Props {
    label: string
}

export function Switch({label} : Props) {
    return (
        <div className={`${styles.SwitchComponent} switch`}>
            <p className={styles.label}>{label}</p>
            <label>
                no
                <input type="checkbox" />
                    <span className="lever"></span>
                    yes
            </label>
        </div>
    )
}