import { ApiRequestType } from "./api";

export interface CreateRequestBase {
  type: ApiRequestType;
  url: string;
  body: { key: string; value: string }[];
  headers: { key: string; value: string }[];
  method: string;
  execOptions: {}[];
}

export interface CreateRequestValuesOnce extends CreateRequestBase {
  type: "once";
  execOptions: {
    date: Date;
  }[];
}

export interface CreateRequestValuesDaily extends CreateRequestBase {
  type: "daily";
  execOptions: {
    hour: string;
  }[];
}

export interface CreateRequestValuesWeekly extends CreateRequestBase {
  type: "weekly";
  execOptions: {
    hour: string;
    day: number;
  }[];
}

export interface CreateRequestValuesMonthly extends CreateRequestBase {
  type: "monthly";
  execOptions: {
    hour: string;
    day: number;
  }[];
}

export type CreateRequestValues =
  | CreateRequestValuesOnce
  | CreateRequestValuesDaily
  | CreateRequestValuesWeekly
  | CreateRequestValuesMonthly;

export type RequestType = "once" | "daily" | "weekly" | "monthly";

interface GetRequestParams {
  responseCount?: number;
  responseOrder?: "asc" | "desc";
}
