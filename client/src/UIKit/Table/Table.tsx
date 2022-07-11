import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useEventsDispatch } from 'hooks';
import { Dispatch, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Checkbox, Chip } from 'UIKit';
import styles from './table.module.css';
import { useCol } from './tableHooks/useCol';

interface TableProps {
  rows: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

interface RowProps {
  id: string;
  rowId: string;
  children: () => ReactNode;
  onClickCheckbox: (rowId: string, checked: boolean) => void;
}

interface ColProps {
  className: string;
  children: () => ReactNode;
}

const Rule = {
  Col(text?: string | boolean) {
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
  return <div className={`${styles.Col} ${className}`}>{children()}</div>;
};

const Row = ({ id, rowId, onClickCheckbox, children }: RowProps) => {
  return (
    <div className={styles.Row}>
      <Checkbox rowId={rowId} onClickCheckbox={onClickCheckbox} />
      <Link className={styles.row_link} to={`/admin/users/${id}`}>
        {children()}
      </Link>
    </div>
  );
};

export function Table({ rows, eventsDispatch }: TableProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const { avoidSomeCols, isColNameKeysOfRows } = useCol();
  if (!rows) return null;
  const onClickCheckbox = (rowId: string, checked: boolean) => {
    eventsAction.selectTableRow({ rowId, select: checked });
  };
  return (
    <div className={styles.Table}>
      {rows.map((row) => (
        <Row
          key={row._id}
          rowId={row._id}
          id={row.itemId}
          onClickCheckbox={onClickCheckbox}
        >
          {() => {
            return Object.entries(row).map(([colName, colValue]) => {
              if (!isColNameKeysOfRows(row, colName)) return
              if (avoidSomeCols(colName)) return;
              return (
                <Col className={styles[colName]} key={colName}>
                  {() => {
                    switch (colName) {
                      case 'avatar': {
                        return Rule.Avatar(colValue[0]);
                      }
                      case 'rule': {
                        return Rule.Chip(colValue);
                      }
                      default: {
                        return Rule.Col(colValue);
                      }
                    }
                  }}
                </Col>
              );
            });
          }}
        </Row>
      ))}
    </div>
  );
}
