import { logger } from 'utils/logger';

class RestClient {
  private static instance: RestClient;
  private baseURL: string;

  private constructor() {
    this.baseURL = browser.options.baseUrl || 'api_domain';
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) RestClient.instance = new RestClient();
    return RestClient.instance;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = process.env.AUTH_TOKEN || '';
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    options.headers = { ...defaultHeaders, ...options.headers };
    logger.info(`API Request: [${options.method || 'GET'}] -> ${fullUrl}`);

    try {
      const response = await fetch(fullUrl, options);

      let responseData: unknown;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        logger.error(
          `API Response Error: [${options.method || 'GET'}] -> ${url} | Status: ${response.status}`,
          responseData,
        );
        throw new Error(
          `API Request failed with status ${response.status}: ${JSON.stringify(responseData)}`,
        );
      }

      return responseData as T;
    } catch (error: any) {
      if (!error.message.includes('API Request failed')) {
        logger.error(`Network or Internet Error when calling API to ${url}`, error);
      }
      throw error;
    }
  }

  public async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return await this.request<T>(url, { method: 'GET', headers });
  }

  public async post<T>(url: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return await this.request<T>(url, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async put<T>(url: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return await this.request<T>(url, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return await this.request<T>(url, { method: 'DELETE', headers });
  }
}

export default RestClient.getInstance();
