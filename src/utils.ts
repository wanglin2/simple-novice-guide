export const prefix = 'simple-novice-guide-'

// 获取一个html节点最近的可滚动的祖先节点
export const getScrollAncestor = (el: HTMLElement) => {
  let style = window.getComputedStyle(el)
  const isAbsolute = style.position === 'absolute'
  const isFixed = style.position === 'fixed'
  const reg = /(auto|scroll)/
  // 如果元素是固定定位，那么可滚动祖先元素为body
  if (isFixed) return document.body
  let parent = el.parentElement
  while (parent) {
    style = window.getComputedStyle(parent)
    // 如果是绝对定位，那么可滚动的祖先元素必须是有定位的才行
    if (!(isAbsolute && style.position === 'static')) {
      // 如果某个祖先元素的overflow属性为auto或scroll则代表是可滚动的
      if (reg.test(style.overflow + style.overflowX + style.overflowY)) {
        return parent
      }
    }
    parent = parent.parentElement
  }
  return document.body
}

// 滚动一个节点的最近一个可滚动的祖先节点，让节点出现在祖先节点的可视区域内
export const scrollAncestorToElement = (el: HTMLElement) => {
  const parent = getScrollAncestor(el)
  if (parent === document.body) return
  let parentRect = parent.getBoundingClientRect()
  let rect = el.getBoundingClientRect()
  parent.scrollTop = parent.scrollTop + rect.top - parentRect.top
  scrollAncestorToElement(parent)
}

// 判断一个节点是否在屏幕可视区域
export const elementIsInView = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  )
}

// 加载图片
export const loadImage = (img: string) => {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = img
  })
}