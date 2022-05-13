import { NextFunction, Request, Response } from "express";
import { Collections } from "./../db/types";
import { useSuperAdmin } from "./../db/useDataBase";
import bcrypt from "bcryptjs";
import { ValidationError } from "./../middleware/errorMiddleware";
import { Collection, FindOptions, ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { createToken, maxAge } from "./../tools/helpers";

interface OwnerReqBody {
  name: string;
  password: string;
}

interface Owner extends OwnerReqBody {
  _id: ObjectId;
  ownerId: string | undefined;
}

export async function registrationPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, password } = req.body as OwnerReqBody;
  try {
    const ownersCollection = await useSuperAdmin.getCollection<Owner>(
      Collections.Owners
    );
    const owner = await ownersCollection.findOne({ name });
    if (!owner) {
      throw new ValidationError("Owner in not exist", "");
    }
    if (owner.name !== name) {
      throw new ValidationError("Incorrect Name or Password", "name");
    }
    if (!bcrypt.compareSync(password, owner.password)) {
      throw new ValidationError("Incorrect Name or Password", "password");
    }
    if (owner.ownerId) {
      const token = createToken(owner.ownerId);
      res.cookie("jwt", token, {
        sameSite: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      return res.status(200).json({ name: owner.name, ownerId: owner.ownerId });
    }
    if (!owner.ownerId) {
      const ownerId = uuidv4();
      const encryptPassword = await bcrypt.hash(password, 10);
      await ownersCollection.updateOne(
        {
          name,
        },
        {
          $set: { ownerId, password: encryptPassword },
        }
      );
      res
        .status(201)
        .json(
          await ownersCollection.findOne<Pick<Owner, "_id" | "password">>(
            { name },
            { projection: { _id: 0, password: 0 } }
          )
        );
    }
  } catch (err) {
    next(err);
  } finally {
    await useSuperAdmin.close();
  }
}
