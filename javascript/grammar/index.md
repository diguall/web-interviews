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

- [x] once
```javascript
function once(fn){
    let count = 1;
    let result;
    return function(){
        if(count === 0) {
            return result;
        }
        count--;
        result = fn.apply(this, arguments);
        fn = undefined;
        return result;
    }
}

// testcase
function log(){
    console.log('run only once');
    return Date.now();
}

const logOnce = once(log);
let log1 = logOnce();
let log2 = logOnce();
console.log(`once:${log1 === log2}, timestamp:${log2}`);
```

-[x] bind
```javascript
(function bindPolyfill(){
    if (Function.prototype.bind) {
        return;
    }
    Function.prototype.bind = function () {
        var self = this, selfArg = arguments[0];

        if(typeof self !== 'function') {
            throw new TypeError('Function.prototype.bind is not valid');
        }

        var args = Array.prototype.slice.call(arguments, 1);

        return function(){
            var funcArgs = args.concat(Array.prototype.slice.call(arguments))
            return self.apply(selfArg, funcArgs);
        };
    }
})();

// testcase
var point = {
  x: 81,
  getX: function() { return this.x; }
};

point.getX(); // 81

var retrieveX = point.getX;
retrieveX(); // undefined

var boundGetX = retrieveX.bind(point);
boundGetX(); // 81
```

- [x] currying
```javascript
function currying(fn, length) {
    // number of parameter
    length = length || fn.length

    return function currier() {
        if (arguments.length < length) {
            return Function.prototype.bind.apply(currier, [this].concat(Array.prototype.slice.call(arguments)));
        } else {
            return fn.apply(this, arguments);
        }
    }
}

// testcase
let testFn = currying(function (a, b, c) {
    return a * b * c;
});

console.info(testFn(2, 3, 4));
console.info(testFn(2)(3)(4));
console.info(testFn(2)(3, 4));
console.info(testFn(2, 3)(4));
```

- [x] debounce 一个函数被调用后，在给定的时间内没有再次被调用，则在给定的时间后执行，否则重新计算时间
debounce(fn, 100)：只有当 fn 被调用后，且经过 100ms 后 fn 没有被再次调用，则执行 fn
用途：鼠标拖动窗口改变大小时
```javascript
function debounce(fn, wait) {
    let timeout;
    return function () {
        let context = this, args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;
            fn.apply(context, args);
        }, wait);

        return;
    };
}

// testcase
window.onresize = debounce(function(){
    console.log(`[${Date.now()}]:execute when no resize event trigger after 1000ms`);
}, 1000);
```


- [x] throttle 一个函数被调用后，在给定的时间内再次被调用不会被执行，只有在给定的时间后再次被调用会被执行
throttle(fn, 100)：每 100ms 只执行一次 fn
用途：限制滚动时间触发的频次
```javascript
function throttle(fn, wait) {
    let timeout = null, previous = 0;

    return function(){
        let context = this, args = arguments;
        let now = Date.now();

        const remaining = wait - (now - previous);

        if (remaining <= 0) {
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            fn.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(function(){
                previous = Date.now();

                timeout = null;
                fn.apply(context, args);
            }, remaining);
        }        
    };
}

// testcase
window.onscroll = throttle(function(){
    console.log(`[${Date.now()}]:execute every 1000ms`);
}, 1000);
```

- [x] querystring
```javascript
// url类似于 'http://www.example.com?a=1&b=b1';

function parseQuerystring(query) {
    if(typeof query !== 'string'){
        return; 
    }

    if(query.charAt(0) === '?') {
        query = query.slice(1);
    }

    let pairs = query.split('&');
    let dict = {};

    for(let i = 0, length = pairs.length; i < length; i++){
        let value = pairs[i];
        let index = value.indexOf('=');

        dict[decode(value.slice(0, index))] = index > -1 ? decode(value.slice(index + 1)) : ''; 
    }

    return dict;
}

function decode(str) {
    return decodeURIComponent(str.replace(/\+/g, ' '));
}

function parseSearchParams(url) {
    let queryIndex = url.indexOf('?');

    return queryIndex === -1 ? '' : url.slice(queryIndex + 1);
}

function parse(url) {
    return parseQuerystring(parseSearchParams(url));
}

console.info(parseQuerystring('?foo=1&bar=2'));
console.info(parseQuerystring('foo=1&bar=2&baz=3+4'));

console.info(parse('http://example.com?foo=1&bar=2'));
console.info(parse('https://example.com?foo=1&bar=2&baz=3+4'));
```

- [x] 箭头函数
```javascript
var obj1 = {
  foo: ()=> {
    console.log(this)
  }
}
var obj2 = {
  name: 'obj',
  foo: function () {
    (() => {
      console.log(this)
    })()
  }
}

obj1.foo()
obj2.foo()
```