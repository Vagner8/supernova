import { EventsReducerActions } from 'admin/Events/eventsReducer';
import { UseFetchUsersForTableResponse } from 'api/users/useFetchUsersForTable';
import { useEventsDispatch } from 'hooks';
import { Dispatch, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Checkbox, CheckboxProps, Chip } from 'UIKit';
import styles from './table.module.css';

type RowType = UseFetchUsersForTableResponse;

interface TableProps {
  rows: RowType[] | null;
  sort: (keyof UseFetchUsersForTableResponse)[];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

interface RowProps {
  row: RowType;
  sort: (keyof UseFetchUsersForTableResponse)[];
  onClickCheckbox: CheckboxProps['onClickCheckbox'];
}

interface ColProps {
  className: string
  children: () => ReactNode;
}

const Rule = {
  Col(text: string | string[]) {
    return <div className={styles.Col}>{text}</div>;
  },
  Avatar(url: string) {
    return <Avatar url={url} size="xs" />;
  },
  Chip(text: string) {
    return <Chip text={text} className={styles.chip} />;
  },
};

const Col = ({ className, children }: ColProps) => {
  return (
    <div className={`${styles.Col} ${className}`}>{children()}</div>
  );
};

const Row = ({ row, sort, onClickCheckbox }: RowProps) => {
  return (
    <div className={styles.Row}>
      <Checkbox rowId={row._id} onClickCheckbox={onClickCheckbox} />
      <Link className={styles.row_link} to={`/admin/users/${row.userId}`}>
        {sort.map((key) => (
          <Col className={styles[key]} key={key}>
            {() => {
              switch (key) {
                case 'avatar': {
                  return Rule.Avatar(row[key][0]);
                }
                case 'rule': {
                  return Rule.Chip(row[key]);
                }
                default: {
                  return Rule.Col(row[key]);
                }
              }
            }}
          </Col>
        ))}
      </Link>
    </div>
  );
};

export function Table({ rows, sort, eventsDispatch }: TableProps) {
  const eventsAction = useEventsDispatch(eventsDispatch)
  if (!rows) return null;
  const onClickCheckbox = (rowId: string, checked: boolean) => {
    console.log('onClickCheckbox')
    eventsAction.selectRow(rowId, checked)
  }
  return (
    <div className={styles.Table}>
      {rows.map((row) => (
        <Row
          onClickCheckbox={onClickCheckbox}
          key={row._id}
          row={row}
          sort={sort}
        />
      ))}
    </div>
  );
}
