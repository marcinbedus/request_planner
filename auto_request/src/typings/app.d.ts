import { Method } from "axios";

export interface Request {
  id: string;
  url: string;
  headers: string;
  method: Method;
  body: string;
  userId: string;
  finished: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
