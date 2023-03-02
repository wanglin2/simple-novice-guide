class NoviceGuide {
  constructor(options) {
    this.options = Object.assign(
      {
        padding: 10,
        margin: 10
      },
      options
    )
    // 步骤数据
    this.steps = []
    // 当前所在步骤
    this.currentStepIndex = -1
    this.highlightEl = null
    this.infoEl = null
    this.initSteps()
  }

  initSteps() {
    this.options.steps.forEach(step => {
      this.steps.push({
        ...step,
        element:
          typeof step.element === 'string'
            ? document.querySelector(step.element)
            : step.element
      })
    })
  }

  start() {
    this.next()
  }

  next() {
    if (this.currentStepIndex + 1 >= this.steps.length) {
      return this.done()
    }
    this.currentStepIndex++
    this.to()
  }

  prev() {
    if (this.currentStepIndex - 1 < 0) {
      return
    }
    this.currentStepIndex--
    this.to()
  }

  to() {
    const currentStep = this.steps[this.currentStepIndex]
    if (!currentStep.element) {
      // 当前步骤没有元素
      this.highlightElement()
      this.showStepInfo(currentStep)
      return
    }
    this.scrollAncestorToElement(currentStep.element)
    const rect = currentStep.element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    if (!this.elementIsInView(currentStep.element)) {
      window.scrollBy(0, rect.top - (windowHeight - rect.height) / 2)
    }
    this.highlightElement(currentStep.element)
    this.showStepInfo(currentStep)
  }

  done() {
    document.body.removeChild(this.highlightEl)
    document.body.removeChild(this.infoEl)
  }

  getScrollAncestor(el) {
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

  scrollAncestorToElement(element) {
    const parent = this.getScrollAncestor(element)
    if (parent === document.body) return
    let parentRect = parent.getBoundingClientRect()
    let rect = element.getBoundingClientRect()
    parent.scrollTop = parent.scrollTop + rect.top - parentRect.top
    this.scrollAncestorToElement(parent)
  }

  highlightElement(el) {
    // box-shadow方式实现
    if (!this.highlightEl) {
      this.highlightEl = document.createElement('div')
      this.highlightEl.style.cssText = `
            position: absolute;
            box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.5);
            z-index: 99999999;
            border-radius: 5px;
            transition: all 0.3s ease-out;
        `
      document.body.appendChild(this.highlightEl)
    }
    if (el) {
      const rect = el.getBoundingClientRect()
      let { padding } = this.options
      this.highlightEl.style.left =
        rect.left + window.pageXOffset - padding + 'px'
      this.highlightEl.style.top =
        rect.top + window.pageYOffset - padding + 'px'
      this.highlightEl.style.width = rect.width + padding * 2 + 'px'
      this.highlightEl.style.height = rect.height + padding * 2 + 'px'
    } else {
      this.highlightEl.style.left =
        window.innerWidth / 2 + window.pageXOffset + 'px'
      this.highlightEl.style.top =
        window.innerHeight / 2 + window.pageYOffset + 'px'
      this.highlightEl.style.width = 0 + 'px'
      this.highlightEl.style.height = 0 + 'px'
    }
  }

  elementIsInView(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    )
  }

  showStepInfo(step) {
    let { padding } = this.options
    if (!this.infoEl) {
      this.infoEl = document.createElement('div')
      this.infoEl.style.cssText = `
            position: absolute;
            z-index: 99999999;
            background-color: #fff; 
            padding: ${padding}px;
            border-radius: 5px;
        `
      document.body.appendChild(this.infoEl)
      this.infoEl.addEventListener('click', e => {
        let type = e.target.getAttribute('data-type')
        if (type) {
          if (type === 'prev') {
            this.prev()
          }
          if (type === 'next') {
            this.next()
          }
        }
      })
    }
    this.infoEl.innerHTML = `
      <div>
        ${
          step.img
            ? `<div>
            <img src="${step.img}" style="width: 250px" />
          </div>`
            : ''
        }
        <div>${step.text}</div>
      </div>
      <div>
        <button data-type="prev">上一步</button>
        <button data-type="next">下一步</button>
      </div>
    `
    if (step.element) {
      this.computeInfoPosition(step)
    } else {
      const rect = this.infoEl.getBoundingClientRect()
      this.infoEl.style.left =
        (window.innerWidth - rect.width) / 2 + window.pageXOffset + 'px'
      this.infoEl.style.top =
        (window.innerHeight - rect.height) / 2 + window.pageYOffset + 'px'
    }
  }

  computeInfoPosition(step) {
    const { padding, margin } = this.options
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const windowPageXOffset = window.pageXOffset
    const windowPageYOffset = window.pageYOffset
    const rect = step.element.getBoundingClientRect()
    const infoRect = this.infoEl.getBoundingClientRect()
    let left = 0
    let top = 0
    const adjustLeft = () => {
      // 优先和高亮框左对齐
      if (windowWidth - rect.left - padding >= infoRect.width) {
        return rect.left - padding + windowPageXOffset
      } else {
        // 否则水平居中显示
        return (windowWidth - infoRect.width) / 2 + windowPageXOffset
      }
    }
    const adjustTop = () => {
      // 优先和高亮框上对齐
      if (windowHeight - rect.top - padding >= infoRect.height) {
        return rect.top - padding + windowPageYOffset
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
    this.infoEl.style.left = left + 'px'
    this.infoEl.style.top = top + 'px'
  }
}

window.NoviceGuide = NoviceGuide

// new NoviceGuide({
//   steps: [
//     {
//       element: ".js-pinned-items-reorder-form .Box",
//       text: "第一步",
//     },
//     {
//       element: ".graph-before-activity-overview",
//       text: "第二步",
//       img: "https://camo.githubusercontent.com/d00642928c6a6bef84b4f0d226d10ca4a2c5318cb483270b6085149ccfa1be59/687474703a2f2f6173736574732e6c78716e7379732e636f6d2f2545352538442538332545352542412539332545372542442539315f2545372542432539362545372541382538422545372541382538422545352542412538462545352539312539382545352538362539392545342542422541332545372541302538312545342542412542412545372538392541395f25453525383525383325453725423425413025453725424325393625453525384625423731333133343131302e706e67",
//     },
//     {
//       text: "纯文字描述",
//       img: "https://avatars.githubusercontent.com/u/17272433?v=4",
//     },
//     {
//       element: ".vcard-details",
//       text: "第三步",
//     },
//   ],
// }).start();
