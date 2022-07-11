import { ValidateError } from "../../../common/src/operationResultType";
import { UserType, ValidatedFields } from "../../../common/src/userTypes";

export type BodyFields = keyof UserType;

interface Options {
  max: number;
  min: number;
  required?: boolean;
  regex?: RegExp;
}

type ValidateOptions<T> = {
  [Key in keyof T]?: Options;
};

class Validator {
  map: Map<keyof ValidatedFields, string> = new Map();
  validateFields: (keyof ValidatedFields)[] = [
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
    phone: {
      min: 5,
      max: 15,
      required: true,
      regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    },
  };

  set(body: UserType) {
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === "object") this.set(value);
      if (this.validateFields.includes(key as keyof ValidatedFields)) {
        this.map.set(key as keyof ValidatedFields, value);
      }
    });
    return this.map;
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

  checkFields(value: string, field: keyof ValidatedFields) {
    const opt = this.options[field];
    if (!opt) return;
    if (value.length === 0 && opt.required)
      return { field, message: "required" };
    if (value.length > opt.max)
      return { field, message: `max ${opt.max} chars` };
    if (value.length < opt.min)
      return { field, message: `min ${opt.min} chars` };
    if (opt.regex && !value.match(opt.regex))
      return { field, message: "incorrect" };
  }
}

export const validator = new Validator();
