import Vue from 'vue'
/**
 * 金额数据处理
 * @params value 调用过滤器时，调用的文本
 */
Vue.filter('priceValue', (value) => {
  // 如果value不存在，返回0.00
  if (!value) {
    return '0.00'
  }
  // 文本转化为float
  const result = parseFloat(value)
  // 如果文本为 integer 类型的文本，表示当前文本没有小数
  if (Number.isInteger(result)) {
    return result
  }
  // 文本包含小数，result.toFixed(2)
  return result.toFixed(2)
})
Vue.filter('filterTime', (value) => {
  if (!value) return ''
  if (value.indexOf(':') === -1) return value
  const arr = value.split(':')
  let result = ''
  if (arr[0] < 10) {
    result = '0' + arr[0]
  } else {
    result = arr[0]
  }
  if (arr[1] < 10) {
    result = result + ':0' + arr[1]
  } else {
    result = result + ':' + arr[1]
  }
  if (arr[2] < 10) {
    result = result + ':0' + arr[2]
  } else {
    result = result + ':' + arr[2]
  }
  return result
})
