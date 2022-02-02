import { Request } from "express";

export interface CronRequest {
  body: string;
  headers: string;
  url: string;
  method: string;
  type: "once" | "daily" | "weekly" | "monthly";
  execOptions: ExecOption[];
}

export interface ExecOption {
  date: Date;
  day: number;
  hour: string;
}

export interface CronRequestData {
  body: string;
  headers: string;
  url: string;
  method: string;
  type: "once" | "daily" | "weekly" | "monthly";
}

export interface RequestWithFilter {
  url: string;
  method: string;
  type: string;
}

export interface CronResponse {
  data: {};
  id: string;
  status: number;
}
