import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

export interface IArticleSearchParams {
  category?: number,
  tag?: number,
  keyword?: string,
  page?: number,
}

export interface IAricleWithSummary {
  id: number; // 文章ID
  code: string; // 文章唯一编码
  title: string; // 文章标题
  cover: string; // 文章封面
  ctime: string; // 文章创建时间
  readCount: number; // 文章阅读量
  mtime: string; // 文章修改时间
  summary: string; // 文章摘要HTML
  user: {
    id: number, // 创建文章用户ID
    account: string, // 创建文章用户账号
    nickname: string, // 创建文章用户昵称
    avatar: string, // 创建文章用户头像
    level: number // 创建文章用户等级
  },
  category: {
    id: number; // 文章分类ID
    name: string; // 文章分类名
  };
  tags: {
    id: number; // 文章标签ID
    name: string; // 文章标签名
  }[];
}

export interface IArticleHead {
  id: string,
  level: number,
  text: string,
}
export interface IArticleRelative {
  id: number,
  code: string,
  title: string,
  ctime: string | Date,
  reads: number,
}
export interface IArticleWithHtml {
  id: number,
  code: string,
  title: string,
  ctime: string | Date,
  mtime: string | Date,
  original: boolean, // 文章来源 true 原创 false 转载
  readCount: number,
  md5: string, // 文章MD5码
  from: string, // 文章来源地址
  html: string, // 文章HTML
  headings: IArticleHead[], // 文章导航信息
  category?: {
    id: number,
    name: string
  },
  tags: {
    id: number,
    name: string,
  }[],
  user: {
    id: number,
    account: string,
    nickname: string,
    avatar: string,
    level: number,
  },
  prev?: IArticleRelative, // 上一篇文章信息
  next?: IArticleRelative, // 下一篇文章信息
}

export interface IArticles<T extends IAricleWithSummary> {
  dataSource: T[], // 文章列表
  total: number, // 总文章数
  tag: string, // 当前tag名
  category: string, // 当前分类名
}

export async function getBlogArticles<T extends IAricleWithSummary = IAricleWithSummary>(data: IArticleSearchParams = {}, options: AxiosRequestConfig = {}) {
  options.params = Object.assign(options.params || {}, data);
  const res = await request.get<IArticles<T>>('/article', options);
  return res.data;
}

export async function getBlogArticleDetail<T extends IArticleWithHtml = IArticleWithHtml>(id: string, options: AxiosRequestConfig = {}) {
  const res = await request.get<T>('/article/' + id, options);
  return res.data;
}