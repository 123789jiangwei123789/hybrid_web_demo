/**
* 判断当前设备是否为iphoneX
* @return boolean
 */
const isIphoneX = () => {
  // window对象存在
  if (typeof window !== 'undefined' && window) {
    // window.navigator.userAgent 包含 iphone，表示在ios设备运行
    // iphoneX 及以上的屏幕垂直像素大于 812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}
window.isIphoneX = isIphoneX()
