import { prefix } from './utils'

let styleEl: HTMLStyleElement = null

export const addCss = () => {
  let cssText = ''
  // 高亮元素样式
  cssText += `
        .${prefix}highlight-el {
            position: absolute;
        }
    `
  // 信息元素样式
  cssText += `
        .${prefix}info-el {
            position: absolute;
            min-width: 250px;
            max-width: 300px;
        }

        .${prefix}info-el-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .${prefix}info-el-title {
            font-size: 18px;
            margin: 0;
            padding: 0;
            font-weight: 700;
        }

        .${prefix}info-el-close {
            cursor: pointer;
            color: #616161;
            font-size: 22px;
            font-weight: 700;
        }

        .${prefix}info-el-info {
            padding: 15px 0;
        }

        .${prefix}info-el-info-img {
            width: 100%;
        }

        .${prefix}info-el-info-text {

        }

        .${prefix}info-el-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        .${prefix}info-el-indicator-item {
            width: 6px;
            height: 6px;
            background: #ccc;
            transition: width .1s ease-in;
            border-radius: 10px;
            cursor: pointer;
            margin: 0 2px;
        }

        .${prefix}info-el-indicator-item.active, .${prefix}info-el-indicator-item:hover {
            width: 15px;
            background: #999;
        }

        .${prefix}info-el-btn-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
        }

        .${prefix}info-el-btn {
            width: 60px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #bdbdbd;
            text-shadow: 1px 1px 0 #fff;
            font-size: 14px;
            color: #424242;
            white-space: nowrap;
            cursor: pointer;
            background-color: #f4f4f4;
            border-radius: 3px;
        }

        .${prefix}info-el-btn.disabled {
            color: #9e9e9e;
            border-color: #bdbdbd;
            cursor: default;
            background-color: #f4f4f4;
        }

        .${prefix}info-el-btn:hover {
            border-color: #9e9e9e;
            background-color: #e0e0e0;
            color: #212121;
        }

        .${prefix}info-el-btn.disabled:hover {
            color: #9e9e9e;
            border-color: #bdbdbd;
            cursor: default;
            background-color: #f4f4f4;
        }
    `
  // 添加到页面
  styleEl = document.createElement('style')
  styleEl.innerHTML = cssText
  document.head.appendChild(styleEl)
}

export const removeCss = () => {
  if (styleEl) {
    document.head.removeChild(styleEl)
  }
}
