import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

export interface IArticleSearchParams {
  category?: number,
  tag?: number,
  keyword?: string,
  page?: number,
}

export interface IArticleHeads {
  id: string,
  name: string,
  level: number,
  children?: IArticleHeads[],
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

export function createArticlesQueryString(params: IArticleSearchParams = {}) {
  const { category, tag, keyword, page } = params;
  const _params = {
    category: category + '', 
    tag: tag + '', 
    keyword, 
    page: page + '', 
  }
  if (!category) Reflect.deleteProperty(_params, 'category');
  if (!tag) Reflect.deleteProperty(_params, 'tag');
  if (!keyword) Reflect.deleteProperty(_params, 'keyword');
  if (!page || page === 1) Reflect.deleteProperty(_params, 'page');
  return _params;
}

export function createArticleHeadings(dataSource: IArticleHead[]): IArticleHeads[] {
  if (!dataSource?.length) return [];
  let level: number = dataSource[0].level;
  const pools: IArticleHeads[] = [];
  const indexs: number[] = [];

  for (let i = 0; i < dataSource.length; i++) {
    const chunk = dataSource[i];
    const children = getHeadingByIndex(pools, indexs);

    if (chunk.level > level) {
      indexs.push(children.length - 1);
      const _children = getHeadingByIndex(pools, indexs);
      _children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    } else if (chunk.level < level) {
      indexs.pop();
      const _children = getHeadingByIndex(pools, indexs);
      _children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    } else {
      children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    }
    
    level = chunk.level;
  }

  return pools;
}

function getHeadingByIndex(pools: IArticleHeads[], indexs: number[]) {
  if (!indexs.length) return pools;
  let res = pools;
  for (let i = 0; i < indexs.length; i++) {
    res = res[indexs[i]].children;
  }
  return res;
}