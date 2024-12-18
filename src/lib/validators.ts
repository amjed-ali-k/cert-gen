import { validator } from "hono/validator";
import jwt from "jsonwebtoken";

export const zodValidator = <T extends {}>(schema: {
  parse: (value: unknown) => T;
}) =>
  validator("json", (value, c) => {
    const parsed = schema.parse(value);
    if (!parsed) {
      return c.json({ message: "Validation failed" }, 400);
    }
    return parsed;
  });

export const jwtDecode = <T>(token: string, key: string): T | null => {
  try {
    const values = jwt.verify(token, key);
    return values as T;
  } catch (error) {
    return null;
  }
};
