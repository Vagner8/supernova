import { EventsState } from 'admin/Events/eventsState';

export const isCopyProfile = (
  copyProfile: EventsState['copyProfile'],
): boolean => {
  return copyProfile ? true : false;
};