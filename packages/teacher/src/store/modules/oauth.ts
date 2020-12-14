// TODO: 应用管理Vuex相关逻辑，待移除
import * as api from '@root/common/api/wechat'
import { getteacherList } from '@root/common/api/teacher'
import * as type from '@root/common/const/type/teacher'
import { ActionContext } from 'vuex'
import { query2Obj, getQuery } from '@root/common/utils/url'
import { accessTokenName } from '@root/common/utils/http'
import { TEACHER_STATUS } from '@root/common/const/enum'

const ADD_OPENID = 'ADD_OPENID' // 添加openid
export const ADD_USERID = 'ADD_USERID' // 添加用户id

const ADD_TOKEN = 'ADD_TOKEN' // 添加token
const ADD_STATUS = 'ADD_STATUS' // 添加ADD_STATUS

export interface Istate {
  openid: string;
  userid: string;
  userList: type.ITeacher[];
  token: string;
  state: string;

}

// initial state
const state: Istate = {
  openid: localStorage.getItem('openid') || '',
  userid: '',
  userList: [],
  token: '',
  state: ''
}

// getters
const getters = {
  openid: (state: Istate) => state.openid
}

// actions
const actions = {
  async fetchOpenId ({ commit }: ActionContext<Istate, any>) {
    const obj = query2Obj(getQuery())

    const code = obj.code
    commit(ADD_STATUS, obj.state || '')

    if (!code) {
      console.error('当前没有code，不执行获取openid接口')
      // alert('当前没有code，不执行获取openid接口');
      return false
    }

    const {
      data: {
        data
      }
    } = await api.openIdLogin({
      openId: code
    })

    console.log(data)

    window.localStorage.setItem(
      accessTokenName,
      data.token
    )

    commit(ADD_TOKEN, localStorage.getItem(accessTokenName))

    commit(ADD_OPENID, data.openid)

    localStorage.setItem('openid', data.openid)
    return true
  },

  async fetchUserId ({ commit, state }: ActionContext<Istate, any>) {
    if (!state.openid) {
      console.error('必须要有openid才可以获取userId')
      return {
        message: '必须要有openid才可以获取userId',
        state: false
      }
    }

    const { data: { data: { list } } } = await getteacherList({
      page: 1,
      limit: 50,
      query: {
        openId: state.openid
      }
    })

    // 判断是否正式的学生
    if (!list || !list.length) {
      console.warn('当前openid没有绑定')
      return {
        message: '当前openid没有绑定,请先在后台绑定',
        state: false
      }
    }

    const [first] = list
    if (!first) {
      return {
        message: '找不到对应的用户',
        state: false
      }
    }

    if (first.state !== TEACHER_STATUS.InService) {
      return {
        message: '改账号已被冻结',
        state: false
      }
    }

    commit(ADD_USERID, first._id)
    return {
      message: '登录成功',
      state: true
    }
  }

}

// mutations
const mutations = {
  [ADD_OPENID] (state: Istate, openid: string) {
    state.openid = openid
  },
  [ADD_USERID] (state: Istate, userid: string) {
    state.userid = userid
  },

  [ADD_TOKEN] (state: Istate, s: string) {
    state.token = s
  },

  [ADD_STATUS] (state: Istate, s: string) {
    state.state = s
  }
}

export type Action = typeof actions;

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
