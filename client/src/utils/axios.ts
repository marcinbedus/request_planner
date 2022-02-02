import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const refreshAuthLogic = (failedRequest: any) =>
  axios
    .get(`${process.env.REACT_APP_USERS_URL}/auth/refresh`, {
      withCredentials: true,
    })
    .then(() => {
      return Promise.resolve();
    });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [403],
});
