import { createRefreshToken } from "./createRefreshToken";

export async function updateRefreshToken(userId: string) {
  const refreshToken = createRefreshToken(userId)
  if (this.collection) {
    await this.collection.updateOne({ userId }, { $set: { refreshToken } });
  }
}