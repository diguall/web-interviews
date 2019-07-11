# CSS 知识点
- [x] CSS选择器
    选择器类别：
    * 简单选择器：`tag,class,id`
    * 属性选择器：`[data-vegetable],[data-vegetable="liquid"]`
    * 伪类选择器：`a:hover`
    * 伪元素选择器： `a::after,a::first-letter`
    * 组合选择器：`th+td`
    * 选择器组：`h1,h2,h3,h4,h5,h6`

    选择器特性：
	* 优先级
	    `!important`
	    
	    Id选择器：`#example`
	    
	    类选择器：`.example`和属性选择器：`[type="radio"]`和伪类：`:hover`
	    
	    类型选择器：`h1`和伪元素：`::before`
	* 继承

	    使用 inherited property 的元素自动继承父级样式，例如`color`
	    
	    使用 non-inherited property 的元素使用初识值，例如`border`
	* 层叠

	    CSS 声明的来源：
	    
	        User-Agent  浏览器默认样式
		
	        User        网页的用户可以定制的样式
		
	        Author      网页开发者定义的样式
	
	    规则：先找出能匹配到元素的规则，然后按照重要性针对这些规则进行排序（以下优先级由低到高）
	    ```
		1. user-agent      normal
		2. user            normal
		3. author          normal
		4. animations
		5. author          !important
		6. user            !important
		7. user agent      !important
		8. transitions
	    ```

    层叠优先级的三因素：
    1. 重要性
        `!importance`总是优先于其它规则
    2. 特殊性
        * `1 0 0 0` 声明在 style 标签内 
        * `0 1 0 0` 选择器中存在 Id 选择器：`#example`
        * `0 0 1 0` 选择器中存在类选择器：`.example`或属性选择器：`[type="radio"]`或伪类：`:hover`
        * `0 0 0 1` 选择器中存在元素选择器：`h1`或伪元素：`::before`
        * 通用选择器：`*`，复合选择器：`+,>,~`，否定伪类：`:not`不影响
    3. 源码顺序
        位置越后的规则优先级越高

- [x] BFC（Block Formatting Context）机制
    
    定义：块级元素互相布局的区域，包括浮动元素的影响

    由以下任一场景创建：
    * root 元素`<html>`
    * 浮动元素  float 不为 none
    * 绝对布局元素  position 为 absolute 或 fixed
    * inline-block
    * table-cell
    * 块级元素 overflow 不为 visible
    * flex 子元素 display:flex 或 inline-flex 的子元素
    * grid 子元素 display:grid 或 inline-grid 的子元素

    BFC 包含元素内部所有的内容，浮动、清除浮动只会作用于同一个 BFC 内的元素，margin collapsing 只会发生在属于同一个 BFC 的块级元素之间

    Margin Collapsing的三种情况：
    * 相邻元素外边距折叠
    * 父元素与第一个、最后一个子元素间外边距折叠
    * 空的块级元素不包含任何内容，则上下外边距折叠

- [x] 盒模型
     
     margin > border > padding > content (width, height) < padding < border < margin

     `box-sizing: context-box;` width = content width

     `box-sizing: border-box;`  width = border + padding + content width
    
- [x] CSS模块化

    LESS,SCSS

    主要特性：Variables,Mixins,Nesting

- [x] 屏幕适配
    * Flexible Grid based Layout：百分比布局
    
        `<meta name="viewport" content="width=device-width, initial-scale=1" />`
    * Flexible Media
    
        ```
        max-width: 100%;
        height: auto;
        ```
    * Media Queries
    
        `@media (min-width: 500px) and (max-width:600px) {}`

- [x] CSS3 新增选择器

    `[attr^=val],[attr$=val],[attr*-val]`
    
    `nth-child(2n),nth-child(2n + 1)`

- [x] CSS3中新增的属性

    ```
    transform: translate3d(-50%,-50%,0);
    transition: width 2s, height 2s, transform 2s;

    animation-name: slidein;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    @keyframe slidein {
        from { margin-left:100%; width:300%; }
        to {margin-left:0%; width:100%; }
    }
    ```

- [x] 布局
    * 标准文档流

        边距：padding + margin + 负margin

        浮动：float 
        
        定位：left + right + top + bottom
    * 百分比布局：float + 百分比，px单位用占父级元素的百分比代替
        ```
        // 清除浮动 CSS3
        .clearfix::after {
            display:block;
            content:"";
            clear:both;
        }

        // 清除浮动 兼容 Firefox 3.5+, Safari 4+, Chrome, Opera 9+, IE 6+
        .clearfix:before, .clearfix:after {
            content:" ";
            display:table;
        }
        .clearfix:after {
            clear:both;
        }
        ```
    * flex 弹性布局

        main axis（主轴）
            主轴方向：flex-direction: row;
            子元素位置：justify-content:space-around;

        cross axis（交叉轴）
            子元素位置：align-items:center;

        flex 容器
            指定布局：display: flex;
            控制子元素溢出：flex-wrap: wrap;

        flex 子元素
            指定flex尺寸：flex: 1;
    * grid 栅格布局：使用框架中的类名来替代，本质上还是百分比布局
        ```
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-gap: 20px;
        
        设置网格线位置，网格线初始位置为第一行、第一列，一个三行三列布局的网格横纵各有四条网格线
        grid-column: 1/3;    // 正向第一列网格线，正向第三列网格线Ï
        grid-column: 2/-1;  // 正向第二列网格线，反向第一列网格线
        grid-row: 2/3;        // 正向第二行网格线，正向第三行网格线
        ```
        
        
            
