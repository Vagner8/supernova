import { Request, Response } from "express";

export function getUsersController(req: Request, res: Response) {
  res.status(200).json({res: 'some users'})
}