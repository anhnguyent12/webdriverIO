import axios, { AxiosInstance, AxiosResponse } from 'axios';
import envConfig from 'env';
import { logger } from 'utils/logger';

class RestClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      logger.info(`[REQUEST] - ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        logger.info(`[PAYLOAD] - ${JSON.stringify(config.data)}`);
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => {
        logger.info(`[RESPONSE] - Status: ${response.status} - ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error(`[ERROR] - Status: ${error.response?.status} - ${error.config?.url}`);
        return Promise.reject(error);
      },
    );
  }

  private getBaseUrl(): string {
    return envConfig?.apiBaseUrl || 'https://demoqa.com/';
  }

  public async get(
    endpoint: string,
    params?: object,
    customHeaders?: Record<string, string>,
  ): Promise<AxiosResponse> {
    const url = this.getBaseUrl() + endpoint;
    return this.client.get(url, { params, headers: customHeaders });
  }

  public async post(
    endpoint: string,
    data: object,
    customHeaders?: Record<string, string>,
  ): Promise<AxiosResponse> {
    const url = this.getBaseUrl() + endpoint;
    return this.client.post(url, data, { headers: customHeaders });
  }

  public async put(
    endpoint: string,
    data: object,
    customHeaders?: Record<string, string>,
  ): Promise<AxiosResponse> {
    const url = this.getBaseUrl() + endpoint;
    return this.client.put(url, data, { headers: customHeaders });
  }

  public async delete(
    endpoint: string,
    data?: object,
    params?: object,
    customHeaders?: Record<string, string>,
  ): Promise<AxiosResponse> {
    const url = this.getBaseUrl() + endpoint;
    return this.client.delete(url, { params, data, headers: customHeaders });
  }
}

export default new RestClient();
