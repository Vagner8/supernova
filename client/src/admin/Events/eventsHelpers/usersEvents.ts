// eslint-disable-next-line import/named
import { NavigateFunction } from "react-router-dom";
import { EventNames } from "../eventsReducer";

interface UsersEvents {
  selectedEvent: EventNames
  navigate: NavigateFunction
}

export function usersEvents({selectedEvent, navigate}: UsersEvents) {
  switch (selectedEvent) {
    case EventNames.New: {
      navigate('/admin/users/new')
    }
  }
}