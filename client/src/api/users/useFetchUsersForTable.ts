import { Projection } from "../../../../common/src/commonTypes";
import { UserType } from "../../../../common/src/userTypes";

const projection: Projection<UserType> = {
  _id: 0,
  personal: 1,
  contacts: 1,
  address: 1,
  imgs: 1,
  configs: {
    login: 1,
    rule: 1,
  },
};

export function useFetchUsersForTable() {

}