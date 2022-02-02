import { CustomError } from "./CustomError";

export class AccessDenied extends CustomError {
  statusCode = 403;
  constructor() {
    super("access denied");
    Object.setPrototypeOf(this, AccessDenied.prototype);
  }

  serializeErrors() {
    return [{ message: "access denied" }];
  }
}
