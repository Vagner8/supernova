import { AdminReducerActions } from "admin/adminReducer";
import { OwnerPII } from "admin/Profile/profileApi";
import { Dispatch } from "react";
import { API, fetcher } from "./fetcher";

interface UpdateOwner {
  adminDispatch: Dispatch<AdminReducerActions>
  ownerPII: OwnerPII
}

export async function updateOwner({adminDispatch, ownerPII}: UpdateOwner) {
  return (await fetcher({
    body: ownerPII,
    method: 'PUT',
    url: API.OwnerUpdate,
    adminDispatch,
    message: 'successful update',
  }));
}