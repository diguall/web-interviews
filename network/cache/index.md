# HTTP-Cache

HTTP1.0 - Expires

HTTP1.1 - Cache-Control

验证缓存优先级：
1. 优先使用 Cache-Control:max-age=N 的请求头，缓存周期为N
2. 检查 Expires 请求头，减去 Date 请求头的值为缓存周期，判断缓存是否有效
3. max-age 和 Expires 都不存在时，检查 Last-Modified 请求头，Date请求头的值减去 Last-Modified 请求头的值，再除以10为缓存周期

`expirationTime = responseTime + freshnessLifetime - currentAge`
responseTime：浏览器接收响应时间
freshnessLifetime：按照优先级，从 max-age =》(Date - Last-Modified)/10
currentAge：Age

缓存流程，Cache-Control 非 no-cache ：
1. 第一次请求服务器，响应头返回 Cache-Control、ETag:xxx
2. 浏览器判断过期时间
    * 第二次请求，若间隔时间在 max-age 之内还未过期，则直接使用本地缓存
    * 第二次请求，若间隔时间超过 max-age，则请求头 带上 If-None-Match:xxx 给服务器
        * 若服务器核对资源的 ETag 未发生变化，则返回 304 Not Modified，延长有效时间
        * 若服务器核对资源的 ETag 发生了变化，则返回 200 及新的资源

缓存流程，Cache-Control 为 no-cache ：
1. 第一次请求服务器，响应头返回 Cache-Control、ETag:xxx
2. 第二次请求，请求头带上 If-None-Match:xxx 给服务器
    * 若服务器核对资源的 ETag 未发生变化，则返回 304 Not Modified
    * 若服务器核对资源的 ETag 发生了变化，则返回 200 及新的资源

缓存流程，Cache-Control 非 no-cache ，非 ETag ：
1. 第一次请求服务器，响应头返回 Cache-Control、Last-Modified
2. 浏览器判断过期时间
    * 第二次请求，若间隔时间在 max-age 之内还未过期，则直接使用本地缓存
    * 第二次请求，若间隔时间超过 max-age，则请求头 带上 If-Modified-Since 给服务器
        * 若服务器核对资源的 Last-Modified 未发生变化，则返回 304 Not Modified
        * 若服务器核对资源的 Last-Modified 发生了变化，则返回 200 及新的资源

缓存流程，Cache-Control 为 no-cache，非 ETag ：
1. 第一次请求服务器，响应头返回 Cache-Control、Last-Modified
2. 第二次请求，请求头带上 If-Modified-Since 给服务器
3. 服务器判断资源有效期
    * 若服务器核对资源的 Last-Modified 未发生变化，则返回 304 Not Modified
    * 若服务器核对资源的 Last-Modified 发生了变化，则返回 200 及新的资源
