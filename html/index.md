# HTML 知识点

- [x] HTML语义化

    定义：使用HTML标记来强化网页和web应用中信息的语义和含义。不仅仅是定义其样式如何展示，且有具体的含义

    举例：`<p>` 表示内嵌的文本是一个段落，人们了解段落的含义，浏览器也知道如何展示

    HTML5标签：`<main> <section> <article> <header> <footer> <nav> <aside>`

    [HTML5 特性](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

    * 语义化
    * 服务器通信
    * 离线存储
    * 多媒体
    * 2D/3D 图形化
    * 性能
    * 设备访问
    * 样式

- [x] HTML5新增属性

    `data-*`属性，可通过 dataset 属性进行访问

    `<input/>`新增属性：`color,date,email,number,range`

    表单新增`<output/>`标签

    `drag,draggable,ondragstart,ondragover,ondrop`
    
    `contentEditable,document.execCommand`

- [x] HTML5新增API

    `history.pushState,history.replaceState`

    `<video> <audio> controls,autoplay`
    
    `localStorage.setItem,localStorage.getItem,localStorage.removeItem,localStorage.clear`

- [x] 滚动性能

* 精简样式
* 减少DOM层级、个数
* Debouncing
* 滚动后，把不可见 <img> 的 src 属性替换为非常小的占位图片
* 滚动后，不可见区域的 visibility 属性设置为 hidden
* 滚动后，比较旧的不可见区域用相同高宽的 div 替换
* 设置图片的宽高，避免客户端对图片缩放
* 避免使用 box-shadow

- [x] 渲染

* Layout: 元素间的间隔，放置的位置
* Painting: 绘制元素
* Compositing: 浏览器按照正确的顺序展示、组合元素