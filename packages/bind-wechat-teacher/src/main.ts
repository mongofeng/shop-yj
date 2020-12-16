import { getQuery, query2Obj } from '@root/common/utils/url'
import '@root/common/assets/css/icon.css'
import '@root/common/assets/css/loading.css'
import '@root/common/assets/css/reset.css'
import { accessTokenName } from '@root/common/utils/http'
import * as api from '@root/common/api/wechat'
async function fetchOpenId () {
  const obj = query2Obj(getQuery())

  const code = obj.code

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

  localStorage.setItem('openid', data.openid)
  return true
}

async function main () {
  const ret = await fetchOpenId()
  console.log(ret)
}

main()
