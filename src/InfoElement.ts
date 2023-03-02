import NoviceGuide, { Step } from '../index'
import { loadImage, prefix } from './utils'

// 信息元素类
export default class HighlightElement {
  public el: HTMLElement
  constructor(public app: NoviceGuide) {
    this.app = app
    this.el = null
    this.app.on('after-step-change', this.onStepChange.bind(this))
  }

  // 显示信息框
  async show(step: Step) {
    if (this.app.options.useCustomInfo && this.app.options.getCustomInfoEl) {
      // 自定义信息框
      let el = await this.app.options.getCustomInfoEl(step)
      let res = this.getInfoRect(step, el)
      el.style.left = res.left + 'px'
      el.style.top = res.top + 'px'
    } else {
      // 内置信息框
      await this.showInnerInfo(step)
    }
  }

  // 显示内置信息框
  async showInnerInfo(step: Step) {
    if (!this.el) {
      this.createEl()
    }
    if (step.img) {
      try {
        await loadImage(step.img)
      } catch (error) {
        console.error(error)
      }
    }
    this.el.innerHTML = this.createHTML(step)
    let res = this.getInfoRect(step, this.el)
    this.el.style.left = res.left + 'px'
    this.el.style.top = res.top + 'px'
  }

  // 计算信息框的位置
  getInfoRect(step: Step, el: HTMLElement) {
    if (step.element) {
      return this.computeInfoPosition(step, el)
    } else {
      // 当前没有元素，则信息元素直接窗口居中显示
      const rect = el.getBoundingClientRect()
      return {
        left: (window.innerWidth - rect.width) / 2 + window.pageXOffset,
        top: (window.innerHeight - rect.height) / 2 + window.pageYOffset
      }
    }
  }

  // 创建内置信息框的内容
  createHTML(step: Step) {
    let { prevText, nextText, showIndicator } = this.app.options
    return `
    <div class="${prefix}info-el-header">
      <div class="${prefix}info-el-title">${step.title || ''}</div>
      <div class="${prefix}info-el-close" data-type="close">×</div>
    </div>
    <div class="${prefix}info-el-info">
      ${
        step.img
          ? `<img class="${prefix}info-el-info-img" src="${step.img}" />`
          : ''
      }
      <div class="${prefix}info-el-info-text">${step.text || ''}</div>
    </div>
    <div class="${prefix}info-el-indicator">
      ${
        showIndicator
          ? this.app.steps
              .map((_, index) => {
                return `<div class="${prefix}info-el-indicator-item ${
                  index === this.app.currentStepIndex ? 'active' : ''
                }" data-type="indicator" data-index="${index}"></div>`
              })
              .join('\n')
          : ''
      }
    </div>
    <div class="${prefix}info-el-btn-group">
      <div class="${prefix}info-el-btn ${prefix}info-el-btn-prev ${
      this.app.isFirstStep() ? 'disabled' : ''
    }" data-type="prev">${prevText}</div>
      <div class="${prefix}info-el-btn ${prefix}info-el-btn-next" data-type="next">${nextText}</div>
    </div>
  `
  }

  // 创建内置信息框元素
  createEl() {
    let { padding, borderRadius, backgroundColor, infoElClass, zIndex } =
      this.app.options
    this.el = document.createElement('div')
    this.el.className = prefix + 'info-el'
    this.el.style.cssText = `
      background-color: ${backgroundColor}; 
      padding: ${padding}px;
      border-radius: ${borderRadius};
      z-index: ${zIndex};
    `
    if (infoElClass) {
      this.el.classList.add(infoElClass)
    }
    document.body.appendChild(this.el)
    this.el.addEventListener('click', this.onClick.bind(this))
  }

  // 内置信息框的点击事件
  onClick(e: MouseEvent) {
    let type = (e.target as HTMLElement).getAttribute('data-type')
    switch (type) {
      case 'close':
        this.app.done()
        break
      case 'prev':
        this.app.prev()
        break
      case 'next':
        this.app.next()
        break
      case 'indicator':
        let index = (e.target as HTMLElement).getAttribute('data-index')
        if (!Number.isNaN(Number(index))) {
          this.app.jump(Number(index))
        }
        break
      default:
        break
    }
  }

  // 移除内置信息框
  removeEl() {
    if (this.el) {
      document.body.removeChild(this.el)
      this.el = null
    }
  }

  // 更新内置信息框的状态
  onStepChange(stepIndex: number) {
    let { nextText, completeText, useCustomInfo } = this.app.options
    if (useCustomInfo) return
    
    // 更新按钮样式和文字
    let prevEl = document.querySelector(`.${prefix}info-el-btn-prev`)
    let nextEl = document.querySelector(`.${prefix}info-el-btn-next`)
    prevEl.classList.remove('disabled')
    nextEl.textContent = nextText
    if (this.app.isFirstStep()) {
      prevEl.classList.add('disabled')
    }
    if (this.app.isLastStep()) {
      nextEl.textContent = completeText
    }

    // 更新指示器
    let indicatorEls = Array.from(
      document.querySelectorAll(`.${prefix}info-el-indicator-item`)
    ) 
    indicatorEls.forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
      }
    })
    if (indicatorEls[stepIndex]) {
      indicatorEls[stepIndex].classList.add('active')
    }
  }

  // 动态计算信息框的位置
  computeInfoPosition(step: Step, el: HTMLElement) {
    const { padding, margin } = this.app.options
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const windowPageXOffset = window.pageXOffset
    const windowPageYOffset = window.pageYOffset
    const rect = step.element.getBoundingClientRect()
    const infoRect = el.getBoundingClientRect()
    let left = 0
    let top = 0
    const adjustLeft = () => {
      // 优先和高亮框左对齐
      if (windowWidth - rect.left - padding >= infoRect.width) {
        return rect.left - padding + windowPageXOffset
      } else if (rect.right + padding >= infoRect.width) {
        // 次优先和高亮框右对齐
        return rect.right + padding - infoRect.width + windowPageXOffset
      } else {
        // 否则水平居中显示
        return (windowWidth - infoRect.width) / 2 + windowPageXOffset
      }
    }
    const adjustTop = () => {
      // 优先和高亮框上对齐
      if (windowHeight - rect.top - padding >= infoRect.height) {
        return rect.top - padding + windowPageYOffset
      } else if (rect.bottom + padding >= infoRect.height) {
        // 次优先和高亮框下对齐
        return rect.bottom + padding - infoRect.height + windowPageYOffset
      } else {
        // 否则水平居中显示
        return (windowHeight - infoRect.height) / 2 + windowPageYOffset
      }
    }
    if (
      rect.bottom + padding + margin + infoRect.height <= windowHeight && // 下方宽度可以容纳
      infoRect.width <= windowWidth // 信息框宽度比浏览器窗口小
    ) {
      // 可以在下方显示
      left = adjustLeft()
      top = rect.bottom + padding + margin + windowPageYOffset
    } else if (
      rect.top - padding - margin >= infoRect.height &&
      infoRect.width <= windowWidth
    ) {
      // 可以在上方显示
      left = adjustLeft()
      top = rect.top - padding - margin - infoRect.height + windowPageYOffset
    } else if (
      rect.left - padding - margin >= infoRect.width &&
      infoRect.height <= windowHeight
    ) {
      // 可以在左方显示
      left = rect.left - padding - margin - infoRect.width + windowPageXOffset
      top = adjustTop()
    } else if (
      rect.right + padding + margin + infoRect.width <= windowWidth &&
      infoRect.height <= windowHeight
    ) {
      // 可以在右方显示
      left = rect.right + padding + margin + windowPageXOffset
      top = adjustTop()
    } else {
      // 否则检查高亮框高度+信息框高度是否小于窗口高度
      let totalHeightLessThenWindow =
        rect.height + padding * 2 + margin + infoRect.height <= windowHeight
      if (
        totalHeightLessThenWindow &&
        Math.max(rect.width + padding * 2, infoRect.width) <= windowWidth
      ) {
        // 上下排列可以放置
        // 滚动页面，居中显示两者整体
        let newTop =
          (windowHeight -
            (rect.height + padding * 2 + margin + infoRect.height)) /
          2
        window.scrollBy(0, rect.top - newTop)
      } else {
        // 恕我无能为力
        // 回到默认位置
      }
      left = adjustLeft()
      top = rect.bottom + padding + margin + windowPageYOffset
    }
    return {
      left,
      top
    }
  }
}
