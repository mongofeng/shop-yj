import { TrialStudentPackage } from '../const/type/trial-student-package'
import { ApiListData, ApiResponse } from '../const/api'
import http from '../utils/http'
import { QueryCondition } from '../types/d/global'

/**
 * 添加学生
 * @param {*} params
 */
export function addTrialStudentPackage (params: Partial<TrialStudentPackage>) {
  return http.post('trial-student-package', params)
}

/**
 *
 * @param params 查询参数
 */
export function getTrialStudentPackageList (params: QueryCondition<TrialStudentPackage>): ApiListData<TrialStudentPackage> {
  return http.post('trial-student-package/list', params)
}

/**
 *
 * @param id 学生的id
 */
export function getTrialStudentPackage (id: string): ApiResponse<TrialStudentPackage> {
  return http.get(`trial-student-package/${id}`)
}

/**
 *
 * @param id 学生id
 * @param params
 */
export function updateTrialStudentPackage (id: string, params: Partial<TrialStudentPackage>): ApiResponse<TrialStudentPackage> {
  return http.put(`trial-student-package/${id}`, params)
}
