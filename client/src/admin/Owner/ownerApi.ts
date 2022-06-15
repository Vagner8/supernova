import {
  AdminReducerActions
} from 'admin/adminReducer';
import {
  EventsReducerActions,
  EventsState,
  saveCopyOfPoints,
  savePoints,
} from 'admin/Events/eventsReducer';
import { UrlAddress } from 'api/fetcher';
import { getData } from 'api/getData';
import { Dispatch } from 'react';

interface FetchAndSavePoints {
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  url: UrlAddress;
}

export async function fetchAndSavePoints({
  eventsDispatch,
  adminDispatch,
  url,
}: FetchAndSavePoints) {
  const points = (await getData({
    adminDispatch,
    url,
    projection: {
      _id: 0,
      personal: 1,
      contacts: 1,
      address: 1,
      imgUrls: 1
    },
  })) as EventsState['points'];
  if (!points) return;
  savePoints(eventsDispatch, points);
  saveCopyOfPoints(eventsDispatch);
}
