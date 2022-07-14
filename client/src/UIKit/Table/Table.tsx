import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useSplitParams } from 'hooks';
import { Dispatch, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'UIKit';
import styles from './table.module.css';
import { useCell } from './tableHooks/useCell';

interface TableProps {
  rows: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

interface RowProps {
  itemId: string;
  rowId: string;
  children: () => ReactNode;
  onClickCheckbox: (rowId: string, checked: boolean) => void;
}

interface CellProps {
  className: string;
  children: () => ReactNode;
}

const Cell = ({ className, children }: CellProps) => {
  return <div className={`${styles.Cell} ${className}`}>{children()}</div>;
};

const Row = ({ itemId, rowId, onClickCheckbox, children }: RowProps) => {
  const { categoryParam } = useSplitParams();
  return (
    <div className={`${styles.Row} ${styles[categoryParam]}`}>
      <Checkbox
        className={styles.row_checkbox}
        rowId={rowId}
        onClickCheckbox={onClickCheckbox}
      />
      <Link
        className={styles.row_link}
        to={`/admin/${categoryParam}/${itemId}`}
      />
      {children()}
    </div>
  );
};

export function Table({ rows, eventsDispatch }: TableProps) {
  const fromUseCell = useCell(eventsDispatch);
  if (!rows) return null;
  const onClickCheckbox = (rowId: string, checked: boolean) =>
    fromUseCell.onClickCheckbox({ rowId, checked });
  return (
    <div className={styles.Table}>
      <div className={styles.right}>
        {rows.map((row) => (
          <Row
            key={row._id}
            rowId={row._id}
            itemId={row.itemId}
            onClickCheckbox={onClickCheckbox}
          >
            {() => {
              return Object.entries(row).map(([cellName, cellValue]) => {
                if (!fromUseCell.isColNameKeysOfRows(row, cellName)) return;
                if (fromUseCell.avoidedCells(cellName)) return;
                return (
                  <Cell className={styles[cellName]} key={cellName}>
                    {() => fromUseCell.typeofCells({ cellName, cellValue })}
                  </Cell>
                );
              });
            }}
          </Row>
        ))}
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
