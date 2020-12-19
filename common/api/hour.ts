import { IHour } from '../const/type/hour'
import { ApiListData, ApiResponse } from '../const/api'
import http from '../utils/http'
import { QueryCondition } from '../types/d/global'

interface Iresult {
    templateMsg: {
        errcode: number;
    };
    student_hour: {
        n: number;
        nModified: number;
        ok: number;
    };
}

/**
 * 添加课程
 * @param {*} params
 */
export function addHour (params: IHour): ApiResponse<Iresult> {
  return http.post('course-hour-flow', params)
}

/**
 *
 * @param params 查询参数
 */
export function getHourrList (params: QueryCondition<IHour>): ApiListData<IHour> {
  return http.post('course-hour-flow/list', params)
}

/**
 *
 * @param id 课程的id
 */
export function getHour (id: string): ApiResponse<IHour> {
  return http.get(`course-hour-flow/${id}`)
}
