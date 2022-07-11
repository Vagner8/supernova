import { ProductForTableResponse } from 'admin/ProductTable/productTableHooks/useFetchToGetProductsForTable';
import { UserForTableResponse } from 'admin/UsersTable/usersTableHooks/useFetchToGetUsersForTable';
import { useMemo } from 'react';

export function useCol() {
  return useMemo(
    () => ({
      avoidSomeCols(
        key: keyof UserForTableResponse | keyof ProductForTableResponse,
      ) {
        if (key === '_id') return true;
        if (key === 'itemId') return true;
        return false;
      },

      isColNameKeysOfRows(
        row: UserForTableResponse | ProductForTableResponse,
        colName: string,
      ): colName is keyof UserForTableResponse | keyof ProductForTableResponse {
        if (colName in row ) return true
        return false
      },
    }),
    [],
  );
}
