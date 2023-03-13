export const loginBaseApi = 'login/';

// 二维码key生成
export const createQrCodeKeyApi = `${loginBaseApi}qr/key`;
// 二维码生成
export const createQrCodeApi = `${loginBaseApi}qr/create`;
// 检测二维码扫码状态
export const checkScanQrCodeApi = `${loginBaseApi}qr/check`;
// 获取登录状态
export const getLoginStatusApi = `${loginBaseApi}status`;
