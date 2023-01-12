import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

function createPluginURL(name: string, url: string = '/') {
  name = name.startsWith('pjblog-plugin-') ? name : 'pjblog-plugin-' + name;
  return '/plugin/' + name + (url === '/' ? '' : url);
}

export class Plugin {
  constructor(private readonly namespace: string) {}

  public async get<T = any>(url: string, options: AxiosRequestConfig = {}) {
    url = createPluginURL(this.namespace, url);
    const res = await request.get<T>(url, options);
    return res.data;
  }

  public async post<T = any, U = any>(url: string, data: U, options: AxiosRequestConfig = {}) {
    url = createPluginURL(this.namespace, url);
    const res = await request.post<T>(url, data, options);
    return res.data;
  }

  public async put<T = any, U = any>(url: string, data: U, options: AxiosRequestConfig = {}) {
    url = createPluginURL(this.namespace, url);
    const res = await request.put<T>(url, data, options);
    return res.data;
  }

  public async delete<T = any>(url: string, options: AxiosRequestConfig = {}) {
    url = createPluginURL(this.namespace, url);
    const res = await request.delete<T>(url, options);
    return res.data;
  }
}

/**
 * 插件专用请求逻辑
 * @param name 插件名
 * @param url 插件路由
 * @param options 请求配置
 * @returns 
 */
export async function pluginFetch<T = any>(name: string, url: string, options: AxiosRequestConfig = {}) {
  url = createPluginURL(name, url);
  const res = await request<T>(Object.assign(options, { url }));
  return res.data;
}