import restClient from 'api/restClient';

const endpoint = {
  get: (userId: string) => `/Account/v1/User/${userId}`,
  create: '/Account/v1/User',
  authorized: '/Account/v1/Authorized',
  delete: (userId: string) => `/Account/v1/User/${userId}`,
  generateToken: '/Account/v1/GenerateToken',
} as const;

class UserService {
  public async getInfo(userId: string, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return await restClient.get(endpoint.get(userId), undefined, headers);
  }

  public async create(userName: string, password: string) {
    return await restClient.post(endpoint.create, { userName, password });
  }

  public async authorized(userName: string, password: string) {
    return await restClient.post(endpoint.authorized, { userName, password });
  }

  public async delete(userId: string, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return await restClient.delete(endpoint.delete(userId), undefined, headers);
  }

  public async generateToken(userName: string, password: string) {
    return await restClient.post(endpoint.generateToken, { userName, password });
  }
}

export default new UserService();
