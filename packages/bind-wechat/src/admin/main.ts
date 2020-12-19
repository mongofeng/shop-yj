
import '@root/common/assets/css/icon.css'
import '@root/common/assets/css/loading.css'
import '@root/common/assets/css/reset.css'
import * as api from '@root/common/api/wechat'
import { addAdminWechat, getAdminWechatList } from '@root/common/api/admin-wechat'
import { IAdminWechat } from '@root/common/const/type/admin-wechat'
import { showError, success } from '@/common/toast'
import { fetchOpenId } from '@/common/get-openid'

// 绑定微信
async function isBindWechat () {
  const { data: { data: { count } } } = await getAdminWechatList({
    page: 1,
    limit: 50,
    query: {
      openId: localStorage.getItem('openid') || ''
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
