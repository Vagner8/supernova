import { EventsState } from 'admin/Events/eventsReducer';

export const isCopyPoints = (
  copyPoints: EventsState['copyPoints'],
): boolean => {
  return copyPoints ? true : false;
};
