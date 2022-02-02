import { ApiRequestType } from "../typings/api";
import { CreateRequestValues, RequestType } from "../typings/app";

export class FormHelper {
  static prepareRequestToSend = (request: CreateRequestValues) => {
    return {
      type: request.type,
      url: request.url,
      method: request.method,
      body: request.body.reduce(
        (obj, item) => ({ ...obj, [item.key]: item.value }),
        {}
      ),
      headers: request.headers.reduce(
        (obj, item) => ({ ...obj, [item.key]: item.value }),
        {}
      ),
      execOptions: request.execOptions,
    };
  };

  static prepareApiRequestToEdit = (
    request: ApiRequestType
  ): CreateRequestValues => {
    return {
      type: request.type,
      url: request.url,
      method: request.method,
      headers: Object.keys(request.headers).map((key) => ({
        key,
        value: request.headers[key],
      })),
      body: Object.keys(request.body).map((key) => ({
        key,
        value: request.body[key],
      })),
      execOptions: request.execOptions,
    } as CreateRequestValues;
  };

  static getDefaultExecOptions = (type: RequestType) => {
    switch (type) {
      case "once": {
        return { date: new Date() };
      }
      case "daily": {
        return { hour: "7:00" };
      }
      case "weekly": {
        return { day: 1, hour: "7:00" };
      }
      case "monthly": {
        return { day: 1, hour: "7:00" };
      }
    }
  };
}
