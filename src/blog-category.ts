import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

export interface ICategory {
  count: string, // 分类下文章数
  id: number, // 分类ID
  name: string, // 分类名
  order: number, // 分类排序
  outable: boolean, // 分类是否为外链
  outlink: string, // 外链地址
}

export async function getBlogCategories<T extends ICategory = ICategory>(options: AxiosRequestConfig = {}) {
  const res = await request.get<T[]>('/category', options);
  return res.data;
}