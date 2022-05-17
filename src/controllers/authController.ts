import { NextFunction, Request, Response } from "express";
import { Collections } from "../db/types";
import { UseDB, useSuperAdmin } from "../db/useDataBase";
import bcrypt from "bcryptjs";
import { ValidationError } from "../middleware/errorMiddleware";
import { Collection, Filter, MongoAPIError, ObjectId, UpdateFilter } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

enum ErrorMessage {
  BadConnection = "bad connection",
  NotFound = "not found",
}

interface Owner {
  _id: ObjectId;
  name: string;
  password: string;
  ownerId: string | undefined;
  refreshToken: string | undefined;
}

class AuthController {
  public ownersCollection: Collection<Owner>;
  public owner: Owner;

  constructor(
    public reqName: string,
    public reqPassword: string,
    public collectionName: Collections,
    public db: UseDB,
    public res: Response
  ) {}

  async run() {
    await this.connectOwnersCollection();
    await this.getOldOwner();
    if (this.owner.ownerId) {
      await this.ownerWithId(this.owner.ownerId);
    }
    if (!this.owner.ownerId) {
      await this.ownerWithoutId();
    }
  }

  async connectOwnersCollection() {
    const { name } = this.connectOwnersCollection;
    try {
      const result = await this.db.getCollection<Owner>(this.collectionName);
      if (!result) {
        throw new MongoAPIError(`${name}, ${ErrorMessage.BadConnection}`);
      }
      this.ownersCollection = result;
    } catch (err) {
      throw new MongoAPIError(`${name}, ${err}`);
    }
  }

  async getOldOwner() {
    const { name } = this.getOldOwner;
    try {
      const result = await this.ownersCollection.findOne({
        name: this.reqName,
      });
      if (!result) {
        throw new ValidationError("owner in not exist", null);
      }
      this.owner = result;
    } catch (err) {
      throw new MongoAPIError(`${name}, ${err}`);
    }
  }

  createTokens(ownerId: string) {
    const accessToken = jwt.sign({ ownerId: ownerId }, process.env.ACCESS, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign({ ownerId: ownerId }, process.env.REFRESH, {
      expiresIn: "10m",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateOwner(filter: Filter<Owner>, update: UpdateFilter<Owner>) {
    const { name } = this.updateOwner;
    try {
      const result = await this.ownersCollection.updateOne(filter, {
        $set: update,
      });
      console.log(result);
    } catch (err) {
      throw new MongoAPIError(`${name}, ${err}`);
    }
  }

  saveAccessTokenInCookie(accessToken: string) {
    this.res.cookie("jwt", accessToken, {
      sameSite: true,
      httpOnly: true,
      maxAge: 60 * 1000 * 2,
    });
  }

  async getOwnerByOwnerId(ownerId: string) {
    return await this.ownersCollection.findOne({ ownerId });
  }

  async ownerWithoutId() {
    const { name, password } = this.owner;
    if (password !== this.reqPassword) {
      throw new ValidationError("incorrect no id", "password");
    }
    const uniqueId = uuidv4();
    const { accessToken, refreshToken } = this.createTokens(uniqueId);
    const encryptedPassword = await bcrypt.hash(this.reqPassword, 10);
    await this.updateOwner(
      { name },
      {
        refreshToken,
        password: encryptedPassword,
        ownerId: uniqueId,
      }
    );
    this.saveAccessTokenInCookie(accessToken);
    this.res.status(201).json(await this.getOwnerByOwnerId(uniqueId));
  }

  async ownerWithId(ownerId: string) {
    if (!bcrypt.compareSync(this.reqPassword, this.owner.password)) {
      throw new ValidationError("incorrect", "password");
    }
    const { accessToken, refreshToken } = this.createTokens(ownerId);
    await this.updateOwner({ ownerId }, { refreshToken });
    this.saveAccessTokenInCookie(accessToken);
    this.res.status(201).json(await this.getOwnerByOwnerId(ownerId));
  }
}

export async function authController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const controller = new AuthController(
      req.body.name,
      req.body.password,
      Collections.Owners,
      useSuperAdmin,
      res
    );
    await controller.run();
  } catch (err) {
    next(err);
  } finally {
    await useSuperAdmin.close();
  }
}
