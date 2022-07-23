import { ProductForTableResponse } from 'admin/ProductTable/productTableHooks/useFetchToGetProductsForTable';
import { UserForTableResponse } from 'admin/UsersTable/usersTableHooks/useFetchToGetUsersForTable';
import { isValueObject } from 'helpers';
import { useMemo } from 'react';
import { Avatar, Chip, Switch } from 'UIKit';
import styles from './../table.module.css';

type CellKeys = keyof UserForTableResponse | keyof ProductForTableResponse;
type Rows = UserForTableResponse | ProductForTableResponse;

interface TypeofCells {
  itemId: string;
  cellValue: string | string[] | boolean;
  cellName: CellKeys;
  onClickSwitch: (itemId: string) => void;
}

export function useCell() {
  return useMemo(
    () => ({
      avoidedCells(cellName: CellKeys) {
        const arr: CellKeys[] = ['_id', 'itemId', 'selected'];
        if (arr.includes(cellName)) return true;
        return false;
      },

      isColNameKeysOfRows(row: Rows, cellName: string): cellName is CellKeys {
        if (cellName in row) return true;
        return false;
      },

      typeofCells({ cellName, cellValue, itemId, onClickSwitch }: TypeofCells) {
        if (isValueObject(cellValue)) return;
        if (cellName === 'disabled') {
          return (
            <Switch
              itemId={itemId}
              label={['off', 'on']}
              disabled={cellValue as boolean}
              onClick={onClickSwitch}
            />
          );
        }
        if (cellName === 'avatar') {
          return <Avatar url={(cellValue as string[])[0]} size="xs" />;
        }
        if (cellName === 'rule' || cellName === 'category') {
          if (typeof cellValue !== 'string') return;
          return <Chip text={cellValue} className={styles.chip} />;
        }
        return cellValue;
      },
    }),
    [],
  );
}
