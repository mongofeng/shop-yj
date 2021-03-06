// TODO: 应用管理Vuex相关逻辑，待移除
import * as api from '@root/common/api/wechat'
import * as apiStu from '@root/common/api/student'
import * as type from '@root/common/const/type/student'
import { ActionContext } from 'vuex'
import { query2Obj, getQuery } from '@root/common/utils/url'
import { accessTokenName } from '@root/common/utils/http'

const ADD_OPENID = 'ADD_OPENID' // 添加openid
export const ADD_USERID = 'ADD_USERID' // 添加用户id

const ADD_USER_MESSAGE_LIST = 'ADD_USER_MESSAGE_LIST' // 添加学生列表相关联的

const ADD_TOKEN = 'ADD_TOKEN' // 添加token
const ADD_STATUS = 'ADD_STATUS' // 添加ADD_STATUS

const ADD_STUDENT_TYPE = 'ADD_STUDENT_TYPE' // 添加是否为试用状态
export interface Istate {
  openid: string;
  userid: string;
  userList: type.IStudent[];
  token: string;
  state: string;
  isTrial: boolean;
}

// initial state
const state: Istate = {
  openid: localStorage.getItem('openid') || '',
  isTrial: false,
  userid: '',
  userList: [],
  token: '',
  state: ''
}

// getters
const getters = {
  openid: (state: Istate) => state.openid,
  userMsg: (state: Istate) => {
    if (!state.userid) {
      return {}
    }
    const find = state.userList.filter((item) => item._id === state.userid)
    if (!find || !find.length) {
      return {}
    }

    const [first] = find
    return first || {}
  },
  userListMsg: (state: Istate) => {
    return state.userList.reduce((initVal: {[key in string]: string}, item) => {
      initVal[item._id] = item.name
      return initVal
    }, {})
  }
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
      return
    }

    const { data: { data: { list } } } = await apiStu.getStudentList({
      page: 1,
      limit: 50,
      query: {
        openId: state.openid
      }
    })

    // 判断是否正式的学生
    if (!list || !list.length) {
      console.warn('当前openid没有绑定')
      commit(ADD_STUDENT_TYPE, true)
      return
    }

    commit(ADD_STUDENT_TYPE, false)

    commit(ADD_USER_MESSAGE_LIST, list) // 绑定多个学yuanyuan情况
    const [first] = list
    if (!first) { return }
    if (!state.userid) {
      commit(ADD_USERID, first._id)
    }
  },

  onChangeUser ({ commit, state }: ActionContext<Istate, any>, id: string) {
    const find = state.userList.filter((item) => item._id === id)
    if (!find || !find.length) {
      return
    }

    const [first] = find
    if (!first) { return }
    commit(ADD_USERID, first._id)
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
  [ADD_USER_MESSAGE_LIST] (state: Istate, list: type.IStudent[]) {
    state.userList = list
  },
  [ADD_TOKEN] (state: Istate, s: string) {
    state.token = s
  },
  [ADD_STUDENT_TYPE] (state: Istate, s: boolean) {
    state.isTrial = s
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
