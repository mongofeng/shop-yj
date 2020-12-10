declare const WeixinJSBridge: any
// https://jkchao.github.io/typescript-book-chinese/typings/lib.html#%E4%BD%BF%E7%94%A8%E4%BE%8B%E5%AD%90
declare interface Documentmore extends Document {
  attachEvent: any;
}

declare let document: Documentmore
export interface WxPayVo {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

export const enum WxPayResponse {
  ok,
  cancel,
  fail,
  err
}

export function wxPay (payResponse: WxPayVo): Promise<WxPayResponse> {
  return new Promise((resolve, reject) => {
    function onBridgeReady () {
      console.log('进行支付')
      WeixinJSBridge.invoke(
        // 'getBrandWCPayRequest', {
        //   appId: payResponse.appId, // 公众号名称，由商户传入
        //   timeStamp: payResponse.timeStamp, // 时间戳，自1970年以来的秒数
        //   nonceStr: payResponse.nonceStr, // 随机串
        //   package: payResponse.package,
        //   signType: 'MD5', // 微信签名方式：
        //   paySign: payResponse.paySign // 微信签名
        // },
        'getBrandWCPayRequest', payResponse,
        function (res: {err_msg: string}) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // alert('支付成功')
            resolve(WxPayResponse.ok)
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            // alert('支付过程中用户取消')
            resolve(WxPayResponse.cancel)
          } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
            // alert('支付失败')
            resolve(WxPayResponse.fail)
          } else {
            // alert('未知异常')
            resolve(WxPayResponse.err)
          }
        }
      )
    }

    // 支付的操作
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  })
}
