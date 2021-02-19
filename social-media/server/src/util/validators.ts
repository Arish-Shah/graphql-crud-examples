import { isEmail, length } from "class-validator";
import { FieldError } from "../resolvers/types/field-error";
import { RegisterInput } from "../resolvers/types/register-input";

export const validateRegister = (input: RegisterInput): FieldError[] | null => {
  const errors: FieldError[] = [];

  if (!isEmail(input.email)) {
    errors.push({
      email: "invalid email",
    });
  }

  if (!length(input.username, 4, 20)) {
    errors.push({
      username: "4-20 characters",
    });
  }

  if (!length(input.password, 4)) {
    errors.push({
      password: "minimum 8 characters",
    });
  }

  return errors.length ? errors : null;
};
