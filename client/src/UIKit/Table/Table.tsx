import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { Fragment, ReactNode } from 'react';
import { Avatar, Checkbox } from 'UIKit';
import styles from './table.module.css';

type RowType = UseFetchUsersForTableResponse;

interface TableProps {
  rows: RowType[] | null;
  sort: (keyof UseFetchUsersForTableResponse)[];
}

interface RowProps {
  row: RowType;
  sort: (keyof UseFetchUsersForTableResponse)[];
}

interface ColProps {
  className: keyof UseFetchUsersForTableResponse;
  children: () => ReactNode;
}

const Col = ({ className, children }: ColProps) => {
  return (
    <div className={`${styles.Col} ${styles[className]}`}>{children()}</div>
  );
};

const Row = ({ row, sort }: RowProps) => {
  return (
    <div className={styles.Row}>
      <Checkbox onClick={() => {}} />
      {sort.map((key) => (
        <Col className={key} key={key}>
          {() => {
            if (key === 'avatar') {
              return <Avatar url={row[key][0]} size="xs" />;
            }
            return <div className={styles.Col}>{row[key]}</div>;
          }}
        </Col>
      ))}
    </div>
  );
};

export function Table({ rows, sort }: TableProps) {
  if (!rows) return null;
  return (
    <div className={styles.Table}>
      {rows.map((row) => (
        <Row key={row._id} row={row} sort={sort} />
      ))}
    </div>
  );
}
