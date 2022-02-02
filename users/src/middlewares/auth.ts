import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenData {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth"] as string;

  if (!token) return res.status(403);

  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as TokenData;

  req.user = { id: decoded.id, username: decoded.username };

  return next();
};
