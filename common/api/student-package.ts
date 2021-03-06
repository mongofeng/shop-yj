
import { IStudentPackage, ICaculatePackage } from '../const/type/student-package'
import { ApiListData, ApiResponse } from '../const/api'
import http from '../utils/http'

/**
 * 添加学员课程包
 * @param {*} params
 */
export function addStudentPackage (params: IStudentPackage) {
  return http.post('student-package', params)
}

/**
 *
 * @param params 查询参数
 */
export function getStudentPackageList (params: any): ApiListData<IStudentPackage> {
  return http.post('student-package/list-all', params)
}

/**
 *
 * @param params 查询参数
 */
export function getSimpleStudentPackageList (params: any): ApiListData<IStudentPackage> {
  return http.post('student-package/simple-list', params)
}

/**
 *
 * @param id 学员课程包的id
 */
export function getPackage (id: string): ApiResponse<IStudentPackage> {
  return http.get(`student-package/${id}`)
}

/**
 *
 * @param id 学员课程包id
 * @param params
 */
export function updateStudentPackage (id: string, params: Partial<IStudentPackage>): ApiResponse<IStudentPackage> {
  return http.put(`student-package/${id}`, params)
}

export function delStudentPackage (id: string): ApiResponse<IStudentPackage> {
  return http.delete(`student-package/${id}`)
}

/**
 * 学生毕业和在读的统计
 * @param params
 */
export function caculatePackage (params?: any): ApiResponse<ICaculatePackage[]> {
  return http.post('statistics/caculatePackage', params)
}
