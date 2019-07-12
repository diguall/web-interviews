# 运行时

JavaScript 的并发模型基于 event loop

![runtime](runtime.svg)

![call stack](call_stack.gif)

## Stack

函数调用形成栈

函数调用栈遵循 LIFO (Last In First Out)

Call Stack：记录函数执行完成时应该交还控制权的位置
* 调用 function 时，加入调用栈并开始执行
* 正在调用栈执行的函数调用其它函数时，新函数也被加入调用栈，并开始执行
* 当前函数执行完毕，解释器将其清出调用栈，继续执行当前执行环境剩下的代码
* 当分配的调用栈空间被占满，会触发堆栈溢出

```javascript
function greeting(){
    sayHi()
}

function sayHi(){
    return "Hi!"
}

greeting()
```

函数的执行顺序如下：
1. 开始执行`greeting()`的调用
2. 把`greeting()`加入调用栈
```
Call stack list:
- greeting
```
3. 执行`greeting()`内部的代码
4. 开始执行`sayHi()`的调用
5. 把`sayHi()`加入调用栈
```
Call stack list:
- greeting
- sayHi
```
6. 执行`sayHi()`内部的代码
7. 当`sayHi()`执行完毕，返回`sayHi()`被调用的位置，继续执行`greeting()`剩余的代码
8. 把`sayHi()`清出调用栈
```
Call stack list:
- greeting
```
9. 当`greeting()`内部的代码执行完毕，返回`greeting()`被调用的位置，继续执行剩余的代码
10. 把`greeting()`清出调用栈
```
Call stack list:
EMPTY
```

## Heap

对象分配在堆中

## Queue

JavaScript运行时使用了一个消息队列，队列中的每一条消息都关联了处理函数

运行时从最先进入队列的消息开始处理队列中的消息，这条消息被移出队列并作为输入参数调用关联函数，创造一个新的栈

## Event Loop

```javascript
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

每一条消息完整执行后，后续消息才会被执行，所以一个函数被执行时，它永远不会被抢占，并且在其它代码运行之前完整执行

缺点：如果一个消息的执行时间过长，web应用就无法处理用户的交互行为，所以应该缩短消息的处理耗时

setTimeout 添加的消息并不会精确的在延迟时间后立即执行，它必须等待前置消息处理完成

```javascript
const s = new Date().getSeconds();

setTimeout(function() {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while(true) {
  if(new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}
```

![event loop](event_loop.png)

JavaScript 的 runtime 包含 **event loop** 和 **callback queue(message queue)**，浏览器把 HTTP请求、DOM事件、setTimeout、setInterval等特性封装成 JavaScript API，也被称为 **Web APIs**，这些 **Web APIs** 都是异步的


```javascript
function printHello() {
    console.log('Hello from baz');
}
function baz() {
    // 1. 加入调用栈，
    // 2. 由于setTimeout的控制权就移交给Web APIs，当执行完毕后，回调函数放到 callback queue，等待 event loop 下次调度
    // 3. 清出调用栈
    // 4. 继续执行后续代码
    // 5. 整个函数执行完成，call stack 清空后，event loop 检查 callback queue，把 callback 放回 call stack 进行执行
    setTimeout(printHello, 3000);
    console.log("baz")
}
function bar() {
    baz();
    console.log("bar")
}
function foo() {
    bar();
    console.log("foo")
}
foo();
```