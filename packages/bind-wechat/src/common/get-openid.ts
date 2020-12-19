import { accessTokenName } from '@root/common/utils/http'
import { getQuery, query2Obj } from '@root/common/utils/url'
import { showError } from './toast'
import * as api from '@root/common/api/wechat'

export async function fetchOpenId () {
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
