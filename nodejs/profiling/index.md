# Profiling

## Benchmark

    [wrk](https://github.com/wg/wrk)：HTTP benchmarking tool

    ```bash
    wrk -t8 -c300 -d30s http://127.0.0.1:19605/fib?index=36
    ```
## Debug

    [nodejs debugging](https://nodejs.org/de/docs/guides/debugging-getting-started/)

* Chrome
    1. `node --inspect main.js`
    2. `chrome://inspect`

* [VSCode](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
    1. Debug -> Open Configurations
    2. edit `program` using main.js
    3. Debug -> Start Debugging

* [WebStorm](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html)

## Profiling

1. NODE_ENV=production node --prof main.js
2. wrk -t8 -c300 -d30 http://127.0.0.1:19605/fib?index=36
3. node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt

打开 processed.txt 文件进行分析
1. `[Summary]` 输出了 CPU 的占用情况
2. 查看 `[Summary]` 中占比最大的部分，例如 `[JavaScript]`，定位到执行耗时很长的代码
3. 再查看 `[Bottom up (heavy) profile]` 的输出，提供了具体的调用栈信息

## Coredump
    
    ulimit -c unlimited
    node --abort-on-uncaught-exception index.js

    gcore

    lldb nod -c core.<pid>

## Heapdump
