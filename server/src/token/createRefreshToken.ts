import jwt from "jsonwebtoken";

export function createRefreshToken(uniqueId: string) {
  return jwt.sign({ userId: uniqueId }, process.env.REFRESH_SECRET, {
    expiresIn: "1h",
    // expiresIn: "5s",
  });
}
