// 定义最大的fontSize
const MAX_FONT_SIZE = 42

// 监听 html 文档被解析完成的事件
document.addEventListener('DOMContentLoaded', () => {
  // 获取html标签
  const html = document.querySelector('html')
  // 获取根元素fontSize的标准，屏幕宽度/10
  let fontSize = window.innerWidth / 10
  // 获取到的fontSize不能超过我们定义的最大值
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素（html）fontSize的大小（rem）
  html.style.fontSize = fontSize + 'px'
})
