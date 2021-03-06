import { ICourse } from '../const/type/course'
import { ApiListData, ApiResponse } from '../const/api'
import http from '../utils/http'
import { QueryCondition } from '../types/d/global'

/**
 * 添加课程
 * @param {*} params
 */
export function addCourse (params: ICourse) {
  return http.post('course', params)
}

/**
 *
 * @param params 查询参数
 */
export function getCourserList (params: QueryCondition<ICourse>): ApiListData<ICourse> {
  return http.post('course/list', params)
}

/**
 *
 * @param id 课程的id
 */
export function getCourse (id: string): ApiResponse<ICourse> {
  return http.get(`course/${id}`)
}

/**
 *
 * @param id 课程id
 * @param params
 */
export function updateCourse (id: string, params: ICourse): ApiResponse<ICourse> {
  return http.put(`course/${id}`, params)
}

export function delCourse (id: string): ApiResponse<ICourse> {
  return http.delete(`course/${id}`)
}

/**
 *
 * @param params id: 学生的id， courseIds： 课程的id
 */
export function delCourseByStudent (params: {
    id: string;
    courseIds: string[];
}) {
  return http.post('course/deleteStudent', params)
}

/**
 *
 * @param params id: 学生的id， courseIds： 课程的id
 */
export function batchCourse (params: {
    id: string;
    courseIds: string[];
}) {
  return http.post('course/batchCourse', params)
}
