import { RequestType } from "./app";

export interface ApiRequestToSend {
  url: string;
  method: string;
  body: {};
  headers: {};
  execOptions: {}[];
}

export interface ApiRequest {
  id: string;
  url: string;
  headers: {
    [key: string]: string;
  };
  body: {
    [key: string]: string;
  };
  method: string;
  finished: boolean;
  userId: string;
  type: RequestType;

  lastResponses: {
    data: {};
    id: string;
    status: number;
    createdAt: Date;
  }[];

  execOptions: {}[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiRequestOnce extends ApiRequest {
  type: "once";
  execOptions: ApiExecOptionsOnce[];
}

export interface ApiExecOptionsOnce {
  date: Date;
}

export interface ApiRequestDaily extends ApiRequest {
  type: "daily";
  execOptions: ApiExecOptionsDaily[];
}

export interface ApiExecOptionsDaily {
  hour: string;
}

export interface ApiRqeuestWeekly extends ApiRequest {
  type: "weekly";
  execOptions: ApiExecOptionsWeekly[];
}

export interface ApiExecOptionsWeekly {
  day: number;
  hour: string;
}

export interface ApiRequestMonthly extends ApiRequest {
  type: "monthly";
  execOptions: ApiExecOptionsMonthly[];
}

export interface ApiExecOptionsMonthly {
  day: number;
  hour: string;
}

export type ApiRequestType =
  | ApiRequestOnce
  | ApiRequestDaily
  | ApiRqeuestWeekly
  | ApiRequestMonthly;

export interface RequestsResponse {
  data: ApiRequestType[];
}

export interface RequestResponse {
  data: ApiRequestType;
}

export interface AddRequestResponse {
  data: ApiRequestType;
}

export interface UpdateRequestResponse {
  data: ApiRequestType;
}
