import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor() {
    super("bad request");
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = () => {
    return [{ message: "bad request" }];
  };
}
