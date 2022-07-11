import { NextFunction, Response, Request } from "express";
import { OperationResultType } from "../../../../common/src/commonTypes";
import { UserType } from "../../../../common/src/userTypes";
import { db } from "../../app";
import { serverError } from "../../helpers/errors";
import { CollectionName } from "../../types";

interface DeleteData {
  cursor: string[];
  collectionName: CollectionName;
  req: Request;
  res: Response;
  next: NextFunction;
}

export async function deleteData({
  cursor,
  collectionName,
  req,
  res,
  next,
}: DeleteData) {
  try {
    const usersCollection = db.collection<UserType>(collectionName);
    for await (const cur of cursor) {
      const result = await usersCollection.deleteOne({ itemId: cur })
      if (result.deletedCount !== 1) throw serverError('bad deletion')
    }
    res.status(200).json({
      status: "success",
      message: `item${cursor.length > 1 ? "s" : ''} deleted`,
    } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
