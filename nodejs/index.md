# Node.js 知识点

定义：在 V8 引擎之上构建的 JavaScript 运行环境

![runtime](runtime.png)

**version: 10.16.0 LTS**

v12 更新：
* V8 引擎更新
* TLS 更新
* http 解析器更新为 llhttp

- [x] Blocking vs Non-Blocking

    I/O：主要指由 libuv 支持的，与系统磁盘和网络进行的交互
    Blocking（阻塞）：阻塞方法是同步执行，Node.js 进程必须等待一个非 JavaScript 的操作完成，才能执行剩余的 JavaScript 代码
    Non-Blocking（非阻塞）：非阻塞方法是异步，Node.js 进程无需等待 I/O 完成，可以继续执行后续的代码，当 I/O 完成时触发回调函数

- [x] Event Loop

    定义：允许 Node.js 执行非阻塞 I/O 操作的手段

    event loop 按照执行顺序分为六个阶段：
![event loop](event_loop.png)

    每个阶段都存在一个 FIFO（First In First Out）的 callbacks 队列
    当 event loop 运行到某个阶段时，会执行队列中的 callbacks，直到所有 callbacks 执行完毕或达到最大个数的限制

- [x] Timers

- [x] Profiling

### heapdump
### coredump
    
    ulimit -c unlimited
    node --abort-on-uncaught-exception index.js

    gcore

    lldb nod -c core.<pid>


- [x] 模块

- [x] require实现原理

- [x] 热更新

- [x] NPM 版本
