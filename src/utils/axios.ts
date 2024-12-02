import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Storage from './storage';

import {ToastMsg} from './toast'; // 引入 ToastMsg 方法

class AxiosService {
  private instance;

  constructor() {
    const baseURL = __DEV__
      ? 'https://dev-api-url.com'
      : 'https://your-api-url.com';

    this.instance = axios.create({
      baseURL: baseURL, // 使用根据环境选择的 baseURL
      timeout: 10000, // 设置请求超时时间
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      async config => {
        try {
          const token = await Storage.get<string>('token'); // 从 Storage 中获取 token
          if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 将 token 添加到请求头
          }
        } catch (error) {
          console.error('获取 token 失败:', error);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        return response.data; // 直接返回数据
      },
      error => {
        ToastMsg(error.message || '请求失败', 3000); // 使用 ToastMsg 显示错误提示
        return Promise.reject(error);
      },
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default new AxiosService();
