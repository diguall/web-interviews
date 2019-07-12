# 基础语法

- [x] 数据类型
    6种基本类型：`Boolean,Number,String,Null,Undefined,Symbol`
    引用类型：`Object`

    Object 有两种属性：数据属性和访问器属性
    * data property

        configurable

        enumerable

        value

        writable

    * accessor property

        configurable

        enumerable

        get

        set

- [x] 运算符：算术，条件，逻辑，位，短路，隐式转换等

    逗号运算符：执行所有语句，返回最后一条语句运算结果

    [优先级执行顺序](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Operator_precedence)

        . []  
        () new 
        ! ~ ++ -- void typeof
            * / %
        + -
        << >> >>>
        === !==
        &
        |
        ^
        &&
        ||
        ?:
        = +=  -=
        ,

- [x] 条件、循环、异常处理if、switch(){case xxx:}、try、catch、finally、throw

- [x] 函数定义、调用方式（apply、call、直接调用）
    ```
    // no-strict 模式下， thisArg 为 null 或 undefined 时，会被替换成全局对象，基本类型的值会被包装成对象
    function.call(thisArg, arg1, arg2, ...)
    function.apply(thisArg, [argsArray])
    ```

- [x] 字符串、数组、对象常用API

    ```
    // index默认为0，超限返回空字符串
    String.prototype.charAt(index)  

    // index默认为0，超限返回 NaN
    String.prototype.charCodeAt(index)  

    // searchIndex不指定时会按照"undefined"字符串进行检索，命中返回 -1
    String.prototype.indexOf(searchIndex, fromIndex)    

    // 去除前后空格
    String.prototype.trim() 

    // operator为空则返回包含整个元素的数据，operator为空字符串则返回每个字符组成的数组
    String.prototype.split(separator, limit)    

    // 如果 beginIndex 大于 endIndex 则返回空字符串
    String.prototype.slice(beginIndex, endIndex)    

    // 如果 indexStart 大于 indexEnd 则交换顺序
    // 如果 index 小于 0 则作为 0 处理
    // 如果 index 大于字符串长度则作为字符串长度处理
    String.prototype.substring(indexStart, indexEnd)  
        
    // regexp不存在时，返回值为 [""]
    // 正则表达式里有 g 标识时，返回所有完整匹配到的字符串
    // 正则表达式里无 g 标识时，与RegExp.exec 一样，返回第一个完
    // 整匹配到的字符串，加上正则括号捕获到的字符串
    String.prototype.match(regexp)
        
    String.prototype.replace(regexp|substr, newSubstr|function)
    ```

- [x] 正则表达式

    换行符 "Some text\n And some more\r\nAnd more".split(/\r\n|\r|\n/)

    匹配 n 次 {n}

    匹配至少 n 次 {n,}