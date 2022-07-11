import { EventsState, ProfilesType } from 'admin/Events/eventsState';
import { useMemo } from 'react';
import { ValidateError } from '../../../common/src/operationResultType';

export function useEventsSelector() {
  return useMemo(
    () => ({
      selectProfilePoints(profile: ProfilesType) {
        const profilePoints: [string, Object][] = []
        Object.entries(profile).forEach(([key, value]) => {
          if (key === 'imgs') return 
          if (value && typeof value === 'object') {
            profilePoints.push([key, value])
          }
        })
        return profilePoints
      },

      selectTableRowsIds(tableRows: EventsState['tableRows']) {
        if (!tableRows) return;
        return tableRows.reduce<string[]>((acc, row) => {
          if (row.selected) acc.push(row.userId);
          return acc;
        }, []);
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
