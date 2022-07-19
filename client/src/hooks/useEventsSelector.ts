import {
  EventsState,
  ProfileType,
  TableRowType,
} from 'admin/Events/eventsState';
import { useMemo } from 'react';
import { ValidateError } from '../../../common/src/commonTypes';

export function useEventsSelector() {
  return useMemo(
    () => ({
      selectDisabledValueByItemId(itemId: string, tableRows: TableRowType[]) {
        const result = tableRows.find((tableRow) => tableRow.itemId === itemId);
        if (result && 'disabled' in result) {
          return result.disabled;
        }
      },

      selectProfilePoints(profile: ProfileType) {
        const profilePoints: [string, Object][] = [];
        Object.entries(profile).forEach(([key, value]) => {
          if (key === 'imgs') return;
          if (value && typeof value === 'object') {
            profilePoints.push([key, value]);
          }
        });
        return profilePoints;
      },

      selectTableRowsIds(tableRows: EventsState['tableRows']) {
        if (!tableRows) return;
        let tableRowsIds: string[] = [];
        for (let row of tableRows) {
          if (row.selected) {
            tableRowsIds.push(row.itemId);
          }
        }
        return tableRowsIds;
      },

      selectFieldErrorByLabel(label: string, validateErrors?: ValidateError[]) {
        if (!validateErrors) return;
        return validateErrors.find((err) => err.field === label);
      },

      isSomeRowSelected(tableRows: EventsState['tableRows']) {
        if (!tableRows) return;
        return tableRows.some((row) => row.selected);
      },

      isProfileCopied(copyProfile: EventsState['copyProfile']) {
        return copyProfile ? true : false;
      },
    }),
    [],
  );
}