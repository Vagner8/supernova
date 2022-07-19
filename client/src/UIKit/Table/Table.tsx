import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions, EventsState, TableRowType } from 'admin/Events/eventsState';
import { GoTo } from 'api/fetcher';
import { updateData } from 'api/updateData';
import {
  useAdminDispatch,
  useEventsDispatch,
  useEventsSelector,
  useSplitParams,
} from 'hooks';
import { Dispatch, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'UIKit';
import styles from './table.module.css';
import { useCell } from './tableHooks/useCell';

interface TableProps {
  tableRows: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
}

interface RowProps {
  itemId: string;
  children: () => ReactNode;
  onClickCheckbox: (itemId: string) => void;
}

interface CellProps {
  className: string;
  children: () => ReactNode;
}

const Cell = ({ className, children }: CellProps) => {
  return <div className={`${styles.Cell} ${className}`}>{children()}</div>;
};

const Row = ({ itemId, onClickCheckbox, children }: RowProps) => {
  const { categoryParam } = useSplitParams();
  return (
    <div className={`${styles.Row} ${styles[categoryParam]}`}>
      <Checkbox
        className={styles.row_checkbox}
        itemId={itemId}
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

export function Table({
  tableRows,
  eventsDispatch,
  adminDispatch,
}: TableProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const adminAction = useAdminDispatch(adminDispatch);
  const { selectDisabledValueByItemId } = useEventsSelector();

  const fromUseCell = useCell();
  if (!tableRows) return null;
  const onClickCheckbox = (itemId: string) => {
    eventsAction.selectTableRow({ itemId });
  };
  const onClickSwitch = (itemId: string) => {
    eventsAction.switchSwitch({ itemId });
    updateData({
      profile: {
        settings: {
          disabled: !selectDisabledValueByItemId(itemId, tableRows),
        },
      },
      url: `${GoTo.ProductUpdate}/?itemId=${itemId}`,
      setIsFetching: adminAction.setIsFetching,
      saveOperationResult: adminAction.saveOperationResult,
    });
  };
  return (
    <div className={styles.Table}>
      <div className={styles.right}>
        {tableRows.map((row) => (
          <Row
            key={row._id}
            itemId={row.itemId}
            onClickCheckbox={onClickCheckbox}
          >
            {() => {
              return Object.entries(row).map(([cellName, cellValue]) => {
                if (!fromUseCell.isColNameKeysOfRows(row, cellName)) return;
                if (fromUseCell.avoidedCells(cellName)) return;
                return (
                  <Cell className={styles[cellName]} key={cellName}>
                    {() =>
                      fromUseCell.typeofCells({
                        itemId: row.itemId,
                        cellName,
                        cellValue,
                        onClickSwitch,
                      })
                    }
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
