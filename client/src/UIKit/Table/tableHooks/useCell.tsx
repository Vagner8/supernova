import { EventsReducerActions } from 'admin/Events/eventsState';
import { ProductForTableResponse } from 'admin/ProductTable/productTableHooks/useFetchToGetProductsForTable';
import { UserForTableResponse } from 'admin/UsersTable/usersTableHooks/useFetchToGetUsersForTable';
import { useEventsDispatch } from 'hooks';
import { Dispatch, useMemo } from 'react';
import { Avatar, Chip } from 'UIKit';
import styles from './../table.module.css';

type ColKeys = keyof UserForTableResponse | keyof ProductForTableResponse;
type Rows = UserForTableResponse | ProductForTableResponse;

interface TypeofCol {
  cellValue: string | string[];
  cellName: ColKeys;
}

interface OnClickCheckbox {
  rowId: string;
  checked: boolean;
}

export function useCell(eventsDispatch: Dispatch<EventsReducerActions>) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  return useMemo(
    () => ({
      onClickCheckbox({rowId, checked}: OnClickCheckbox) {
        eventsAction.selectTableRow({ rowId, select: checked });
      },

      avoidSomeCols(key: ColKeys) {
        if (key === '_id') return true;
        if (key === 'itemId') return true;
        return false;
      },

      isColNameKeysOfRows(row: Rows, cellName: string): cellName is ColKeys {
        if (cellName in row) return true;
        return false;
      },

      typeofCells({ cellName, cellValue }: TypeofCol) {
        if (cellName === 'avatar') {
          return <Avatar url={cellValue[0]} size="xs" />;
        }
        if (typeof cellValue !== 'string') return;
        if (cellName === 'rule' || cellName === 'category') {
          return <Chip text={cellValue} className={styles.chip} />;
        }
        return cellValue;
      },
    }),
    [eventsAction],
  );
}
