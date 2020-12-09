export interface PayVo {
  openid: string;
  packageId: string;
  studentId: string;
}

export interface PayDto {
    // private URI payUri;
     appId: string;
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string; // 加密方式
    orderAmount: number;
    orderId: string;
    outTradeNo: string;
    mwebUrl: string;
    body: string;
    codeUrl: string;
    attach: string;
    payPlatformEnum: number;
}
