import * as type from '../const/type/wechat'
import { AxiosPromise } from 'axios'
import http from '../utils/http'
import { ApiResponse } from '../const/api'

/**
 * 获取openId
 * @param params
 */
export function fetchOpenId (params: type.ICode): AxiosPromise<type.IOpenId> {
  return http.post('wechat/openid', params)
}

export function fetchUserInfo (params: type.IInfo): AxiosPromise<type.IUserInfo> {
  return http.post('wechat/userInfo', params)
}

export function jsTicket (params: {url: string}): ApiResponse<type.JsSdkDto> {
  return http.post('/wechat/jsTicket', params)
}

export function openIdLogin (params: {
  openId: string;
}): AxiosPromise<{data: {
  token: string;
  openid: string;
};}> {
  return http.post('auth/openId', params)
}
