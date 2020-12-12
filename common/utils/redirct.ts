export function RedirectUrl (host: string, query?: string) {
  const appid = process.env.VUE_APP_APP_ID
  const state = query ? `state=${query}` : ''
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${host}&response_type=code&scope=snsapi_userinfo&${state}#wechat_redirect`
}
