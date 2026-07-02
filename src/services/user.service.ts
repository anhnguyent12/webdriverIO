import { DeleteUser, GenerateToken, Unauthorize, UserInfo } from 'models/user';
import restClient from 'api/restClient';

const endpoint = {
  get: (userId: string) => `/Account/v1/User/${userId}`,
  create: '/Account/v1/User',
  authorized: '/Account/v1/Authorized',
  delete: (userId: string) => `/Account/v1/User/${userId}`,
  generateToken: '/Account/v1/GenerateToken',
} as const;

class UserService {
  // Header: authorization: token
  public async getInfo(userId: string): Promise<UserInfo> {
    return await restClient.get<UserInfo>(endpoint.get(userId));
  }

  public async create(userName: string, password: string): Promise<UserInfo> {
    return await restClient.post<UserInfo>(endpoint.create, { userName, password });
  }

  public async authorized(userName: string, password: string): Promise<boolean> {
    return await restClient.post<boolean>(endpoint.authorized, { userName, password });
  }

  // Header: authorization: token
  public async delete(userId: string): Promise<DeleteUser | Unauthorize> {
    return await restClient.delete<DeleteUser | Unauthorize>(endpoint.delete(userId));
  }

  public async generateToken(userName: string, password: string): Promise<GenerateToken> {
    return await restClient.post<GenerateToken>(endpoint.generateToken, { userName, password });
  }
}

export default new UserService();
