import { Collection } from "mongodb";
import { UserType } from "../../../common/src/userTypes";

export async function writeRefreshToken(
  userId: string,
  refreshToken: string,
  usersColl: Collection<UserType>
) {
  return await usersColl.updateOne({ userId }, { $set: { refreshToken } });
}
