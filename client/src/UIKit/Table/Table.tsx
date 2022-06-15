import styles from './table.module.css';

interface RowType {
  id: string;
  avatar: string;
  name: string;
}

interface TableProps {
  rows: RowType[];
}

interface RowProps {
  row: RowType;
}

interface ColProps {
  text: string;
}

const Col = ({ text }: ColProps) => {
  return <div className={styles.Col}>{text}</div>;
};

const Row = ({ row }: RowProps) => {
  return (
    <div className={styles.Row}>
      {Object.entries(row).map(([key, value]) => (
        <Col key={key} text={value} />
      ))}
    </div>
  );
};

export function Table({ rows }: TableProps) {
  return (
    <div className={styles.Table}>
      {rows.map((row) => (
        <Row key={row.id} row={row} />
      ))}
    </div>
  );
}
