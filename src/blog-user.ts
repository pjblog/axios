import { request } from './axios';
import { AxiosRequestConfig } from 'axios';

export interface IUser {
  id: number, // 用户ID
  account: string, // 用户账号
  nickname: string, // 用户昵称
  email: string, // 用户邮箱
  avatar: string, // 用户头像
  forbiden: boolean, // 用户是否被禁止登录
  level: number, // 用户等级 0 超级管理员 1 管理员 >1 其余为普通用户
  website: string, // 用户个人主页
  gmt_create: string | Date,
  gmt_modified: string | Date,
}

export interface ILoginBody {
  account: string,
  password: string,
}

export type IRegisterBody = ILoginBody;

export interface IProfileBody {
  nickname: string, 
  email: string, 
  avatar: string, 
  website: string,
}

export interface IPasswordBody {
  oldPassword: string, 
  newPassword: string, 
}

export async function getBlogMyInfo(options: AxiosRequestConfig = {}) {
  const res = await request.get<IUser>('/me', options);
  return res.data;
}

export async function login(data: ILoginBody, options: AxiosRequestConfig = {}) {
  const res = await request.put<number>('/login', data, options);
  return res.data;
}

export async function logout(options: AxiosRequestConfig = {}) {
  const res = await request.delete<number>('/logout', options);
  return res.data;
}

export async function register(data: IRegisterBody, options: AxiosRequestConfig = {}) {
  const res = await request.post<number>('/register', data, options);
  return res.data;
}

export async function profile(data: IProfileBody, options: AxiosRequestConfig = {}) {
  const res = await request.put<number>('/profile', data, options);
  return res.data;
}

export async function password(data: IPasswordBody, options: AxiosRequestConfig = {}) {
  const res = await request.put<number>('/password', data, options);
  return res.data;
}

export function createDefaultBlogMyInfoValue(): IUser {
  return {
    id: 0,
    account: null,
    nickname: null,
    email: null,
    avatar: null,
    forbiden: false,
    level: 1,
    website: null,
    gmt_create: new Date(),
    gmt_modified: new Date(),
  }
}