import { axiosInstance } from "../utils/axios";

class UsersService {
  private usersUrl = process.env.REACT_APP_USERS_URL as string;

  public getCurrentUser = () => {
    return axiosInstance.get(`${this.usersUrl}/auth/user`);
  };

  public logout = () => {
    return axiosInstance.get(`${this.usersUrl}/auth/logout`);
  };
}

export default new UsersService();
