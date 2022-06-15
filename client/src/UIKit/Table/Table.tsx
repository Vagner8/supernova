import styles from './table.module.css'

interface Row {
  id: string;
  avatar: string;
  name: string
}

interface TableProps {
  rows: Row[]
}

export function Table({rows}: TableProps) {
  return (
    <div className={styles.Table}>

    </div>
  )
}