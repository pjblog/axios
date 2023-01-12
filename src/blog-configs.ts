import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

export interface IConfigs {
  close: boolean; // 网站是否关闭
  description: string; // 网站描述
  name: string; // 网站名称
  theme: string; // 网站主题
  article_size: number, // 网站文章列表每页文章篇数
  keywords: string, // 网站关键字
  copyright: string, // 网站版权信息
  icp: string, // 网站ICP备案信息
  domain: string, // 网站域名
  favicon: string, // 网站favicon地址
  articles: number, // 网站总文章数
  reads: number, // 网站总阅读量
  notice: string, // 网站公告
}

export async function getBlogConfigs(options: AxiosRequestConfig = {}) {
  const res = await request.get<IConfigs>('/configs', options);
  return res.data;
}

export async function getBlogThemeConfigs<T extends Record<string, any> = {}>(options: AxiosRequestConfig = {}) {
  const res = await request.get<T>('/theme/configs', options);
  return res.data;
}

export function createDefaultBlogConfigsValue(): IConfigs {
  return {
    close: false,
    description: null,
    name: null,
    theme: 'pjblog-theme-default',
    article_size: 10,
    keywords: null,
    copyright: null,
    icp: null,
    domain: null,
    favicon: null,
    articles: 0,
    reads: 0,
    notice: null,
  }
}