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

- [x] Promise
```javascript
  // 判断变量否为function
  const isFunction = variable => typeof variable === 'function'
  // 定义Promise的三种状态常量
  const PENDING = 'PENDING'
  const FULFILLED = 'FULFILLED'
  const REJECTED = 'REJECTED'

  class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加状态
      this._value = undefined
      // 添加成功回调函数队列
      this._fulfilledQueues = []
      // 添加失败回调函数队列
      this._rejectedQueues = []
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
      const run = () => {
        if (this._status !== PENDING) return
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = (value) => {
          let cb;
          while (cb = this._fulfilledQueues.shift()) {
            cb(value)
          }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = (error) => {
          let cb;
          while (cb = this._rejectedQueues.shift()) {
            cb(error)
          }
        }
        /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
        if (val instanceof MyPromise) {
          val.then(value => {
            this._value = value
            this._status = FULFILLED
            runFulfilled(value)
          }, err => {
            this._value = err
            this._status = REJECTED
            runRejected(err)
          })
        } else {
          this._value = val
          this._status = FULFILLED
          runFulfilled(val)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) { 
      if (this._status !== PENDING) return
      // 依次执行失败队列中的函数，并清空队列
      const run = () => {
        this._status = REJECTED
        this._value = err
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
      const { _value, _status } = this
      // 返回一个新的Promise对象
      return new MyPromise((onFulfilledNext, onRejectedNext) => {
        // 封装一个成功时执行的函数
        let fulfilled = value => {
          try {
            if (!isFunction(onFulfilled)) {
              onFulfilledNext(value)
            } else {
              let res =  onFulfilled(value);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        // 封装一个失败时执行的函数
        let rejected = error => {
          try {
            if (!isFunction(onRejected)) {
              onRejectedNext(error)
            } else {
                let res = onRejected(error);
                if (res instanceof MyPromise) {
                  // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                  res.then(onFulfilledNext, onRejectedNext)
                } else {
                  //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                  onFulfilledNext(res)
                }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        switch (_status) {
          // 当状态为pending时，将then方法回调函数加入执行队列等待执行
          case PENDING:
            this._fulfilledQueues.push(fulfilled)
            this._rejectedQueues.push(rejected)
            break
          // 当状态已经改变时，立即执行对应的回调函数
          case FULFILLED:
            fulfilled(_value)
            break
          case REJECTED:
            rejected(_value)
            break
        }
      })
    }
    // 添加catch方法
    catch (onRejected) {
      return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
      // 如果参数是MyPromise实例，直接返回这个实例
      if (value instanceof MyPromise) return value
      return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
      return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
      return new MyPromise((resolve, reject) => {
        /**
         * 返回值的集合
         */
        let values = []
        let count = 0
        for (let [i, p] of list.entries()) {
          // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
          this.resolve(p).then(res => {
            values[i] = res
            count++
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values)
          }, err => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err)
          })
        }
      })
    }
    // 添加静态race方法
    static race (list) {
      return new MyPromise((resolve, reject) => {
        for (let p of list) {
          // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
          this.resolve(p).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }
      })
    }
    finally (cb) {
      return this.then(
        value  => MyPromise.resolve(cb()).then(() => value),
        reason => MyPromise.resolve(cb()).then(() => { throw reason })
      );
    }
  }
```