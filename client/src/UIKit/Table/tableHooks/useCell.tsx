import { EventsReducerActions } from 'admin/Events/eventsState';
import { ProductForTableResponse } from 'admin/ProductTable/productTableHooks/useFetchToGetProductsForTable';
import { UserForTableResponse } from 'admin/UsersTable/usersTableHooks/useFetchToGetUsersForTable';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useMemo } from 'react';
import { Avatar, Chip, Switch } from 'UIKit';
import styles from './../table.module.css';

type CellKeys = keyof UserForTableResponse | keyof ProductForTableResponse;
type Rows = UserForTableResponse | ProductForTableResponse;

interface TypeofCol {
  cellValue: string | string[];
  cellName: CellKeys;
}

interface OnClickCheckbox {
  rowId: string;
  checked: boolean;
}

export function useCell(eventsDispatch: Dispatch<EventsReducerActions>) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  return useMemo(
    () => ({
      onClickCheckbox({ rowId, checked }: OnClickCheckbox) {
        eventsAction.selectTableRow({ rowId, select: checked });
      },

      avoidedCells(cellName: CellKeys) {
        const arr: CellKeys[] = ['_id', 'itemId', 'selected']
        if (arr.includes(cellName)) return true;
        return false;
      },

      isColNameKeysOfRows(row: Rows, cellName: string): cellName is CellKeys {
        if (cellName in row) return true;
        return false;
      },

      typeofCells({ cellName, cellValue }: TypeofCol) {
        if (cellName === 'disabled') {
          return <Switch />;
        }
        if (cellName === 'avatar') {
          return <Avatar url={cellValue[0]} size="xs" />;
        }
        if (cellName === 'rule' || cellName === 'category') {
          if (typeof cellValue !== 'string') return;
          return <Chip text={cellValue} className={styles.chip} />;
        }
        return cellValue;
      },
    }),
    [eventsAction],
  );
}
