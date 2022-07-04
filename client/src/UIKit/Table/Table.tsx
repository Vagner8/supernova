import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { ReactNode } from 'react';
import { Avatar, Checkbox, CheckboxProps, Chip } from 'UIKit';
import styles from './table.module.css';

type RowType = UseFetchUsersForTableResponse;

interface TableProps {
  rows: RowType[] | null;
  sort: (keyof UseFetchUsersForTableResponse)[];
  onClickCheckbox: CheckboxProps['onClickCheckbox'];
}

interface RowProps {
  row: RowType;
  sort: (keyof UseFetchUsersForTableResponse)[];
  rowId: string;
  onClickCheckbox: CheckboxProps['onClickCheckbox'];
}

interface ColProps {
  className: keyof UseFetchUsersForTableResponse;
  children: () => ReactNode;
}

const Rule = {
  Col(text: string | string[]) {
    return <div className={styles.Col}>{text}</div>
  },
  Avatar(url: string) {
    return <Avatar url={url} size="xs" />
  },
  Chip(text: string) {
    return <Chip text={text} className="table_chip" />
  }
}

const Col = ({ className, children }: ColProps) => {
  return (
    <div className={`${styles.Col} ${styles[className]}`}>{children()}</div>
  );
};

const Row = ({ row, sort, rowId, onClickCheckbox }: RowProps) => {
  return (
    <div className={styles.Row}>
      <Checkbox checkboxId={rowId} onClickCheckbox={onClickCheckbox} />
      {sort.map((key) => (
        <Col className={key} key={key}>
          {() => {
            switch(key) {
              case 'avatar': {
                return Rule.Avatar(row[key][0])
              }
              case 'rule': {
                return Rule.Chip(row[key])
              }
              default: {
                return Rule.Col(row[key])
              }
            }
          }}
        </Col>
      ))}
    </div>
  );
};

export function Table({ rows, sort, onClickCheckbox }: TableProps) {
  if (!rows) return null;
  return (
    <div className={styles.Table}>
      {rows.map((row) => (
        <Row
          onClickCheckbox={onClickCheckbox}
          key={row._id}
          row={row}
          sort={sort}
          rowId={row._id}
        />
      ))}
    </div>
  );
}
