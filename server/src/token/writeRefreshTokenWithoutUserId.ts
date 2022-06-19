import { Collection } from "mongodb";
import { UserType } from "../../../common/src/userTypes";
import bcrypt from "bcryptjs";

interface WrightRefreshToken {
  usersColl: Collection<UserType>;
  login: string;
  password: string
  refreshToken: string;
  uniqueId: string
}

export async function writeRefreshTokenWithoutUserId({
  usersColl,
  login,
  refreshToken,
  password,
  uniqueId
}: WrightRefreshToken) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return await usersColl.updateOne(
    { "configs.login": login },
    {
      $set: {
        refreshToken,
        userId: uniqueId,
        "configs.password": encryptedPassword,
      },
    }
  );
}
