
import '@root/common/assets/css/icon.css'
import '@root/common/assets/css/loading.css'
import '@root/common/assets/css/reset.css'

import { bindWechat, getteacherList } from '@root/common/api/teacher'
import { ITeacher } from '@root/common/const/type/teacher'
import { showError, success } from '@/common/toast'
import { fetchOpenId } from '@/common/get-openid'

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
  await bindWechat(params)
  success()
}

async function main () {
  try {
    const ret = await fetchOpenId()
    console.log(ret)
    if (ret) {
      await bindTeacherWechat()
    }
  } catch (error) {
    showError('网络错误')
  }
}

main()
