import { Collection } from "mongodb";
import { UserType } from "../../../common/src/userTypes";

export async function writeRefreshToken(
  adminId: string,
  refreshToken: string,
  usersColl: Collection<UserType>
) {
  return await usersColl.updateOne({ userId: adminId }, { $set: { refreshToken } });
}
