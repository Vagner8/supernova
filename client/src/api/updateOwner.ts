import { AdminReducerActions } from "admin/adminReducer";
import { EventsState } from "admin/Events/eventsReducer";
import { Dispatch } from "react";
import { API, fetcher } from "./fetcher";

interface UpdateOwner {
  adminDispatch: Dispatch<AdminReducerActions>
  changedPoints: EventsState['changedPoints'];
}

export async function updateOwner({adminDispatch, changedPoints}: UpdateOwner) {
  return (await fetcher({
    body: changedPoints,
    method: 'PUT',
    url: API.OwnerUpdate,
    adminDispatch,
    message: 'successful update',
  }));
}