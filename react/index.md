# React 知识点

## Why React
* React 在数据更新时的渲染性能表现的非常优秀，React 组件首次初始化后，如果数据产生修改，会用前一次和当前 render 的结果进行 diff，获取 DOM 的最小更改操作后再重新渲染，尽可能高效执行 DOM 更新
* React 只是用来创建可复用的 UI 组件
* React 不使用模版，而是分解为组件来呈现视图
