import { check } from "express-validator";

export const requestValidator = [
  check("url")
    .notEmpty()
    .withMessage("cannot be empty")
    .isURL()
    .withMessage("must be valid url"),
  check("method").notEmpty().withMessage("cannot be empty"),
];
