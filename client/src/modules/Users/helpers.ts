import {
  Contacts, Origin, Personal, User,
} from './types';

export function pointsOfUser(user: User) {
  const {
    name, surname, _id, birth, address, registration, email, phone, img,
  } = user;
  const personal: Personal = { _id, name, surname };
  const origin: Origin = { birth, address };
  const contacts: Contacts = { registration, email, phone };
  return { points: [personal, origin, contacts], img };
}
