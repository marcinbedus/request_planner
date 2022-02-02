import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessDenied } from "../utils/errors/AccessDenied";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

interface TokenData {
  id: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth"] as string;

  if (!token) throw new AccessDenied();

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user: any) => {
    if (err) throw new AccessDenied();

    req.user = user;
    next();
  });
};
