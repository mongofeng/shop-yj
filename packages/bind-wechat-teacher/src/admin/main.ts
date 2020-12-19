import { getQuery, query2Obj } from '@root/common/utils/url'
import '@root/common/assets/css/icon.css'
import '@root/common/assets/css/loading.css'
import '@root/common/assets/css/reset.css'
import { accessTokenName } from '@root/common/utils/http'
import * as api from '@root/common/api/wechat'
import { addAdminWechat, getAdminWechatList } from '@root/common/api/admin-wechat'
import { IAdminWechat } from '@root/common/const/type/admin-wechat'

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

// 绑定微信
async function isBindWechat () {
  const { data: { data: { count } } } = await getAdminWechatList({
    page: 1,
    limit: 50,
    query: {
      _id: localStorage.getItem('openid') || ''
    }
  })

  // 判断是否正式的学生
  if (count > 0) {
    console.warn('当前微信已经绑定')
    showError('当前微信已经绑定')
    return
  }
  // 获取微信信息
  const { data } = await api.fetchUserInfo({
    openid: localStorage.getItem('openid') || ''
  })

  const nickname = data.nickname || (data as any).data.nickname

  const params: IAdminWechat = {
    id: localStorage.getItem('state') || '',
    _id: localStorage.getItem('state') || '',
    name: nickname,
    openId: localStorage.getItem('openid') || ''
  }
  await addAdminWechat(params)
  success()
}

async function main () {
  try {
    const ret = await fetchOpenId()
    console.log(ret)
    if (ret) {
      await isBindWechat()
    }
  } catch (error) {
    showError('网络错误')
  }
}

main()
