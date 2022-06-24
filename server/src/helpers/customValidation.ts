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

const validateFields: (keyof ValidateFields)[] = [
  "login",
  "password",
];

interface Options {
  max: number;
  min: number;
}

type ValidateOptions<T> = {
  [Key in keyof T]?: Options;
};

const options: ValidateOptions<ValidateFields> = {
  login: {
    min: 4,
    max: 10,
  },
  password: {
    min: 6,
    max: 10,
  },
};

type MapVal = Map<keyof ValidateFields, string>;
const map: MapVal = new Map();

export const getValidateFields = (body: UserType) => {
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === "object") getValidateFields(value);
    if (validateFields.includes(key as keyof ValidateFields)) {
      if (value) map.set(key as keyof ValidateFields, value);
    }
  });
  return map;
};

const fieldsValidator = (value: string, field: keyof ValidateFields) => {
  const opt = options[field];
  if (value.length > opt.max) return { field, message: `max ${opt.max} chars` };
  if (value.length < opt.min) return { field, message: `min ${opt.min} chars` };
};

export const validator = (map: MapVal) => {
  const errs: ValidateError[] = [];
  map.forEach((value, field) => {
    errs.push(fieldsValidator(value, field));
  });
  map.clear();
  return errs;
};
