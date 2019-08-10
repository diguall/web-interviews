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
1. node --inspect main.js
2. chrome://inspect > Profiler > Profiles > Start
4. wrk -t8 -c300 -d30 http://127.0.0.1:19605/fib?index=36
5. Stop

## Coredump
1. root@xxx:/nodejs/app# `ulimit -c unlimited`
2. root@xxx:/nodejs/app# `echo "1" > /proc/sys/kernel/core_uses_pid`
3. root@xxx:/nodejs/app# `echo "/tmp/core.%p" > /proc/sys/kernel/core_pattern`
4. root@xxx:/nodejs/app# `node --abort-on-uncaught-exception crash.js`
5. root@xxx:/nodejs/app# `llnode node -c /tmp/core.<pid>`
6. (llnode) `v8 bt`

## Heapdump
1. node --inspect main.js
2. chrome://inspect > Memory > Profiles > Take snapshot