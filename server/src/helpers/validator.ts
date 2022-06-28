import { ValidateError } from "../../../common/src/operationResultType";
import {
  RequiredFields,
  UserAddressType,
  UserConfigsType,
  UserContactsType,
  UserPersonalType,
  UserType,
  ValidatedFields,
  ValidatedFieldsKeys,
} from "../../../common/src/userTypes";

export type BodyFields = keyof UserType;

interface Options {
  max: number;
  min: number;
  required?: boolean;
}

type ValidateOptions<T> = {
  [Key in keyof T]?: Options;
};

class Validator {
  map: Map<ValidatedFieldsKeys, string> = new Map();
  validateFields: ValidatedFieldsKeys[] = [
    "login",
    "password",
    "email",
    "name",
    "surname",
  ];
  requiredFields: RequiredFields = [
    "login",
    "password",
    "email",
    "name",
    "surname",
    "phone",
  ];
  options: ValidateOptions<ValidatedFields> = {
    login: {
      min: 4,
      max: 10,
      required: true,
    },
    password: {
      min: 6,
      max: 10,
      required: true,
    },
    name: {
      min: 1,
      max: 25,
      required: true,
    },
    surname: {
      min: 1,
      max: 25,
      required: true,
    },
    email: {
      min: 4,
      max: 30,
      required: true,
    },
  };

  set(body: UserType) {
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === "object") this.set(value);
      if (this.validateFields.includes(key as ValidatedFieldsKeys)) {
        this.map.set(key as ValidatedFieldsKeys, value);
      }
    });
    return this.map;
  }

  checkFields(value: string, field: ValidatedFieldsKeys) {
    const opt = this.options[field];
    if (!opt) return;
    if (value.length === 0 && (this.requiredFields as string[]).includes(field))
      return { field, message: "required" };
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
