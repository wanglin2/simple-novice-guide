import HighlightElement from './src/HighlightElement'
import InfoElement from './src/InfoElement'
import { scrollAncestorToElement, elementIsInView } from './src/utils'
import { addCss, removeCss } from './src/css'
import EventEmitter from 'eventemitter3'

export interface Step {
  element: HTMLElement
  title: string | number
  text: string | number
  img: string
}

type GetCustomInfoEl = (step: Step) => Promise<HTMLElement>

interface Options {
  padding?: number
  margin?: number
  boxShadowColor?: string
  transition?: string
  borderRadius?: string
  highlightElClass?: string
  backgroundColor?: string
  infoElClass?: string
  prevText?: string
  nextText?: string
  completeText?: string
  showIndicator?: boolean
  zIndex?: number
  useCustomInfo?: boolean
  getCustomInfoEl?: GetCustomInfoEl
  steps: Array<
    Step & {
      element: HTMLElement | string
    }
  >
}

type Steps = Array<Step>

interface DefaultOptions {
  // 高亮元素和信息框元素的内边距
  padding: number
  // 高亮元素和信息框元素之间的间距
  margin: number
  // 高亮元素的box-shadow颜色
  boxShadowColor: string
  // 高亮元素过渡效果
  transition: string
  // 高亮元素和信息框元素的圆角
  borderRadius: string
  // 要添加到高亮元素上的css类名
  highlightElClass: string
  // 信息框元素的背景颜色
  backgroundColor: string
  // 要添加到信息框元素上的css类名
  infoElClass: string
  // 上一步按钮的文字
  prevText: string
  // 下一步按钮的文字
  nextText: string
  // 完成按钮的文字
  completeText: string
  // 是否显示信息框内的指示器
  showIndicator: boolean
  // 高亮元素和信息框的z-index
  zIndex: number
  // 是否使用自定义的信息框，如果开启，需要传递getCustomInfoEl选项
  useCustomInfo: boolean
  // 返回自定义信息框元素
  getCustomInfoEl: GetCustomInfoEl
  // 步骤数据
  steps: Array<Step>
}

// 默认配置
const defaultOptions: DefaultOptions = {
  padding: 10,
  margin: 10,
  boxShadowColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease-out',
  borderRadius: '5px',
  highlightElClass: '',
  backgroundColor: '#fff',
  infoElClass: '',
  prevText: '上一步',
  nextText: '下一步',
  completeText: '完成',
  showIndicator: true,
  zIndex: 9999,
  useCustomInfo: false,
  getCustomInfoEl: null,
  steps: []
}

// 入口类
class NoviceGuide extends EventEmitter {
  public steps: Steps
  public currentStepIndex: number
  public infoElement: InfoElement
  public highlightElement: HighlightElement
  public addedCss: boolean
  constructor(public options: Options) {
    super()
    // 选项
    this.options = Object.assign(defaultOptions, options)
    // 步骤数据
    this.steps = []
    // 当前所在步骤
    this.currentStepIndex = -1
    // 实例化辅助类
    this.highlightElement = new HighlightElement(this)
    this.infoElement = new InfoElement(this)
    // 初始化步骤数据
    this.initSteps()
  }

  // 初始化步骤数据
  initSteps() {
    this.options.steps.forEach(step => {
      this.steps.push({
        ...step
      })
    })
  }

  // 开始
  start() {
    if (this.steps.length <= 0) return
    // 添加元素的样式到页面
    if (!this.addedCss) {
      addCss()
      this.addedCss = true
    }
    this.next()
  }

  // 下一步
  next() {
    this.emit('before-step-change', this.currentStepIndex)
    if (this.currentStepIndex + 1 >= this.steps.length) {
      return this.done()
    }
    this.currentStepIndex++
    this.to(this.currentStepIndex)
  }

  // 上一步
  prev() {
    this.emit('before-step-change', this.currentStepIndex)
    if (this.currentStepIndex - 1 < 0) {
      return
    }
    this.currentStepIndex--
    this.to(this.currentStepIndex)
  }

  // 跳转到指定步骤
  jump(stepIndex: number) {
    this.currentStepIndex = stepIndex
    this.to(stepIndex)
  }

  // 达到某一步
  async to(stepIndex: number) {
    const currentStep = this.steps[stepIndex]
    // 当前步骤没有元素就不用处理滚动
    currentStep.element =
      typeof currentStep.element === 'string'
        ? document.querySelector(currentStep.element)
        : currentStep.element
    if (currentStep.element) {
      scrollAncestorToElement(currentStep.element)
      const rect = currentStep.element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (!elementIsInView(currentStep.element)) {
        window.scrollBy(0, rect.top - (windowHeight - rect.height) / 2)
      }
    }
    this.highlightElement.show(currentStep)
    await this.infoElement.show(currentStep)
    this.emit('after-step-change', stepIndex)
  }

  // 结束
  done() {
    this.highlightElement.removeEl()
    this.infoElement.removeEl()
    removeCss()
    this.addedCss = false
    this.currentStepIndex = -1
    this.emit('done')
  }

  // 是否是第一步
  isFirstStep() {
    return this.currentStepIndex <= 0
  }

  // 是否是最后一步
  isLastStep() {
    return this.currentStepIndex >= this.steps.length - 1
  }
}

export default NoviceGuide
