import {
  AddRequestResponse,
  ApiRequestToSend,
  RequestResponse,
  RequestsResponse,
  UpdateRequestResponse,
} from "../typings/api";
import { RequestType, GetRequestParams } from "../typings/app";
import { axiosInstance } from "../utils/axios";

class RequestService {
  private requestUrl = process.env.REACT_APP_REQUESTS_URL as string;

  public getAll = () => {
    return axiosInstance.get<RequestsResponse>(`${this.requestUrl}/request`);
  };

  public getAllWithType = (type: RequestType) => {
    return axiosInstance.get<RequestsResponse>(
      `${this.requestUrl}/request?type=${type}`
    );
  };

  public get = (id: string, params?: GetRequestParams) => {
    return axiosInstance.get<RequestResponse>(
      `${this.requestUrl}/request/${id}`,
      { params }
    );
  };

  public create = (data: ApiRequestToSend) => {
    return axiosInstance.post<any, AddRequestResponse>(
      `${this.requestUrl}/request`,
      data
    );
  };

  public delete = (id: string) => {
    return axiosInstance.delete(`${this.requestUrl}/request/${id}`);
  };

  public update = (id: string, data: Partial<ApiRequestToSend>) => {
    return axiosInstance.patch<UpdateRequestResponse>(
      `${this.requestUrl}/request/${id}`,
      data
    );
  };
}

export default new RequestService();
