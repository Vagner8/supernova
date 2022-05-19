import { NextFunction, Request, Response } from "express";

export const tokenMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  console.log('tokenMiddleware')
  res.clearCookie('ownerId')
  next()
}