import { getQuery, query2Obj } from '@root/common/utils/url'
import '@root/common/assets/css/icon.css'
import '@root/common/assets/css/loading.css'
import '@root/common/assets/css/reset.css'
import { accessTokenName } from '@root/common/utils/http'
import * as api from '@root/common/api/wechat'
import { bindWechat, getteacherList } from '@root/common/api/teacher'
import { ITeacher } from '@root/common/const/type/teacher'

const loadingDom = document.getElementById('loading') as HTMLElement
const warnDom = document.getElementById('warn') as HTMLElement
const successDom = document.getElementById('success') as HTMLElement

function showError (text: string) {
  const t = warnDom.querySelector('h2')
  if (t) {
    t.innerText = text
  }
  loadingDom.classList.remove('show')
  loadingDom.classList.add('hide')
  warnDom.classList.remove('hide')
  warnDom.classList.add('show')
}

function success () {
  loadingDom.classList.remove('show')
  loadingDom.classList.add('hide')
  successDom.classList.remove('hide')
  successDom.classList.add('show')
}

async function fetchOpenId () {
  const obj = query2Obj(getQuery())

  const code = obj.code

  const state = obj.state

  if (!code) {
    console.error('当前没有code，不执行获取openid接口')
    showError('请在重新扫码微信浏览器中登录')

    return false
  }

  if (!state) {
    console.error('当前没有state，不执行获取state接口')
    showError('当前没有state')
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

  localStorage.setItem('openid', data.openid)
  localStorage.setItem('state', state)
  return true
}

async function bindTeacherWechat () {
  const { data: { data: { list } } } = await getteacherList({
    page: 1,
    limit: 50,
    query: {
      _id: localStorage.getItem('state') || ''
    }
  })

  // 判断是否正式的学生
  if (!list || !list.length) {
    console.warn('找不到老师账号')
    showError('当前老师不存在, 请重新扫描二维码')
    return
  }

  // 判断是否正式的学生
  if (list && list.length && list[0].openId) {
    console.warn('当前账号openid有绑定')
    showError('当前老师已经绑定微信，请联系管理员')
    return
  }

  const params: Partial<ITeacher> = {
    id: localStorage.getItem('state') || '',
    _id: localStorage.getItem('state') || '',
    openId: localStorage.getItem('openid') || ''
  }
  return bindWechat(params)
}

async function main () {
  try {
    const ret = await fetchOpenId()
    console.log(ret)
    if (ret) {
      await bindTeacherWechat()
      success()
    }
  } catch (error) {
    showError('网络错误')
  }
}

main()
