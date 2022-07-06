import { EventsState } from 'admin/Events/eventsState';

export const isCopyPoints = (
  copyPoints: EventsState['copyPoints'],
): boolean => {
  return copyPoints ? true : false;
};