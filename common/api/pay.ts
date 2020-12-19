
import { ApiResponse } from '../const/api'
import { PayDto, PayVo } from '../const/type/pay'
import http from '../utils/http'

/**
 * 添加订单
 * @param {*} params
 */
export function addOrder (params: PayVo): ApiResponse<PayDto> {
  return http.post('pay', params)
}
