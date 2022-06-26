import { ValidateError } from "../../../common/src/operationResultType";
import {
  UserAddressType,
  UserConfigsType,
  UserContactsType,
  UserPersonalType,
  UserType,
} from "../../../common/src/userTypes";

export type BodyFields = keyof UserType;

export type ValidateFields = UserConfigsType &
  UserPersonalType &
  UserContactsType &
  UserAddressType;

interface Options {
  max: number;
  min: number;
}

type ValidateOptions<T> = {
  [Key in keyof T]?: Options;
};

class Validator {
  map: Map<keyof ValidateFields, string> = new Map();
  validateFields: (keyof ValidateFields)[] = ["login", "password", "name", "surname"];
  options: ValidateOptions<ValidateFields> = {
    login: {
      min: 4,
      max: 10,
    },
    password: {
      min: 6,
      max: 10,
    },
    name: {
      min: 1,
      max: 25,
    },
    surname: {
      min: 1,
      max: 25,
    },
    email: {
      min: 4,
      max: 30,
    }
  };

  set(body: UserType) {
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === "object") this.set(value);
      if (this.validateFields.includes(key as keyof ValidateFields)) {
        if (value)
          this.map.set(key as keyof ValidateFields, value);
      }
    });
    return this.map;
  }

  checkFields(value: string, field: keyof ValidateFields) {
    const opt = this.options[field];
    if (!opt) return;
    if (value.length > opt.max)
      return { field, message: `max ${opt.max} chars` };
    if (value.length < opt.min)
      return { field, message: `min ${opt.min} chars` };
  }

  check(map: Validator["map"]) {
    const errs: ValidateError[] = [];
    map.forEach((value, field) => {
      const error = this.checkFields(value, field);
      if (!error) return;
      errs.push(error);
    });
    map.clear();
    return errs;
  }
}

export const validator = new Validator();
