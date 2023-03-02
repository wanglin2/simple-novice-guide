# Simple novice guide

一个简单的新手引导库。

# 安装

```bash
npm i simple-novice-guide
```

# 使用

```js
import SimpleNoviceGuide from 'simple-novice-guide'

new SimpleNoviceGuide({
    steps: [
        {
            element: '#id',
            title: '我是标题',
            text: '我是信息',
            img: '我是图片'
        }
    ]
}).start()
```

如果要使用`umd`格式的文件，可以安装完后在`node_modules/simple-novice-guide/dist/`目录里选择使用`dist.js`或`dist.min.js`文件。

# 本地开发

1.开启`ts`编译

```bash
npm run tsc
```

2.开启打包编译

```bash
npm run build
```

3.开启页面服务

```bash
npx http-server -e js -c-1
```

访问`[ip][port]/index.html`。

然后就可以愉快的修改代码了，不过没有热更新功能哦，所以记得修改后要刷新页面。

# 文档

## 创建实例

```js
const noviceGuide = new SimpleNoviceGuide(options)
```

### 参数options

对象类型，可以传递一下设置：

| 属性             | 类型     | 默认值             | 描述                                                         |
| ---------------- | -------- | ------------------ | ------------------------------------------------------------ |
| steps            | array    |                    | 步骤数据，必填，信息数据见下表                               |
| padding          | number   | 10                 | 高亮元素和信息框元素的内边距，单位`px`                       |
| margin           | number   | 10                 | 高亮元素和信息框元素之间的间距，单位`px`                     |
| boxShadowColor   | string   | rgba(0, 0, 0, 0.5) | 高亮元素的box-shadow颜色                                     |
| transition       | string   | all 0.3s ease-out  | 高亮元素过渡效果                                             |
| borderRadius     | string   | 5px                | 高亮元素和信息框元素的圆角                                   |
| highlightElClass | string   |                    | 要添加到高亮元素上的css类名                                  |
| backgroundColor  | string   | \#fff              | 信息框元素的背景颜色                                         |
| infoElClass      | string   |                    | 要添加到信息框元素上的css类名                                |
| prevText         | string   | 上一步             | 上一步按钮的文字                                             |
| nextText         | string   | 下一步             | 下一步按钮的文字                                             |
| completeText     | string   | 完成               | 完成按钮的文字                                               |
| showIndicator    | boolean  | true               | 是否显示信息框内的指示器                                     |
| zIndex           | number   | 9999               | 高亮元素和信息框的z-index                                    |
| useCustomInfo    | boolean  | false              | 是否使用自定义的信息框，如果开启，需要传递getCustomInfoEl选项 |
| getCustomInfoEl  | function | null               | 返回自定义信息框元素                                         |

### options.steps属性

`options.steps`属性值需为一个对象数组，对象的结构如下：

| 属性    | 类型                  | 默认值 | 描述                                                         |
| ------- | --------------------- | ------ | ------------------------------------------------------------ |
| element | HTMLElement \| string |        | 该步骤需要高亮的`html`元素，可以是一个选择器，也可以是`dom`节点对象，如果当前步骤不需要高亮元素，也可以不传 |
| title   | string \| number      |        | 当前步骤的标题                                               |
| text    | string \| number      |        | 当前步骤的信息                                               |
| img     | string                |        | 当前步骤的图片                                               |



## 实例属性

### noviceGuide.options

选项对象。



### noviceGuide.steps

步骤列表数据。



### noviceGuide.currentStepIndex

当前所在步骤的索引。



## 实例方法

### noviceGuide.start()

开始。



### noviceGuide.next()

下一步。



### noviceGuide.prev()

上一步。



### noviceGuide.jump(*stepIndex*: number)

跳转到指定步骤。



### noviceGuide.done()

结束。



### noviceGuide.isFirstStep()

是否是第一步。



### noviceGuide.isLastStep()

是否是最后一步。



### noviceGuide.on(eventName, (...args) => {})

监听事件。

事件发送继承的是[eventemitter3](https://github.com/primus/eventemitter3)，详细文档可以参考它的文档。

实例会发出的事件如下：

| 事件名             | 回调参数                  | 描述         |
| ------------------ | ------------------------- | ------------ |
| before-step-change | stepIndex（当前步骤索引） | 即将切换步骤 |
| after-step-change  | stepIndex（当前步骤索引） | 步骤切换完毕 |
| done               |                           | 新手引导结束 |



### noviceGuide.emit(eventName, ...args)

发送事件。



### noviceGuide.off(eventName, fn?)

解除监听事件。



## 自定义信息框

如果内置的信息框无法满足你的需求，也可以自定义信息框，首先实例化时需要传递以下两个参数：

```js
const noviceGuide = new SimpleNoviceGuide({
    useCustomInfo: true,
    getCustomInfoEl: async (step) => {
        return document.querySelector('.customInfoBox')
    }
})
```

`getCustomInfoEl`方法需要返回你自定义的信息框的节点，考虑到可能有异步的操作，所以统一返回一个`Promise`。

注意你自定义的信息框元素需要设置绝对定位，`z-index`也是必不可少的：

```css
.customInfoBox {
    position: absolute;
    z-index: 99999;
}
```

然后需要在你的信息框中创建相应的上一步、下一步、完成的按钮，然后手动调用下列方法：

```js
noviceGuide.prev()

noviceGuide.next()

noviceGuide.done()
```

通常还需要监听`done`事件来删除或隐藏你的自定义信息框：

```js
noviceGuide.on('done', () => {
    customInfoBoxEl.style.display = 'none'
})
```

