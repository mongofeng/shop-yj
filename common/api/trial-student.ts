import { TrialStudent } from '../const/type/trial-student'
import { ApiListData, ApiResponse } from '../const/api'
import http from '../utils/http'
import { QueryCondition } from '../types/d/global'

/**
 * 添加学生
 * @param {*} params
 */
export function addStudent (params: Partial<TrialStudent>) {
  return http.post('trial-student', params)
}

/**
 *
 * @param params 查询参数
 */
export function getStudentList (params: QueryCondition<TrialStudent>): ApiListData<TrialStudent> {
  return http.post('trial-student/list', params)
}

/**
 *
 * @param id 学生的id
 */
export function getStudent (id: string): ApiResponse<TrialStudent> {
  return http.get(`trial-student/${id}`)
}

/**
 *
 * @param id 学生id
 * @param params
 */
export function updateStudent (id: string, params: Partial<TrialStudent>): ApiResponse<TrialStudent> {
  return http.put(`trial-student/${id}`, params)
}
