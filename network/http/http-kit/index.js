const http = require('http');
const https = require('https');
const http2 = require('http2');

const url = require('url');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const httpsPort = 3443;
const http2Port = 3080;

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname === '/favicon.ico') {
        return responseFavIcon(res);
    }
    if (/^\/assets\/.*\.png/.test(pathname)) {
        return responseImage(pathname, res);
    }
    if (/^\/static\/.*\.js/.test(pathname)) {
        return responseJsFile(pathname, res);
    }
    if (/^\/static\/.*\.css/.test(pathname)) {
        return responseCssFile(pathname, res);
    }

    if (pathname === '/http_https_http2') {
        return responseComparePage(res);
    }

    return responseHomePage(res);
}).listen(port, hostname, () => {
    console.log(`HTTP running at http://${hostname}:${port}/`);
});

https.createServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
}, (req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname === '/favicon.ico') {
        return responseFavIcon(res);
    }
    if (/^\/assets\/.*\.png/.test(pathname)) {
        return responseImage(pathname, res);
    }
    if (/^\/static\/.*\.js/.test(pathname)) {
        return responseJsFile(pathname, res);
    }
    if (/^\/static\/.*\.css/.test(pathname)) {
        return responseCssFile(pathname, res);
    }
    return responseHomePage(res);
}).listen(httpsPort, () => {
    console.log(`HTTPS running at https://${hostname}:${httpsPort}/`);
});


http2.createSecureServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
}, (req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname === '/favicon.ico') {
        return responseFavIcon(res);
    }
    if (/^\/assets\/.*\.png/.test(pathname)) {
        return responseImage(pathname, res);
    }
    if (/^\/static\/.*\.js/.test(pathname)) {
        return responseJsFile(pathname, res);
    }
    if (/^\/static\/.*\.css/.test(pathname)) {
        return responseCssFile(pathname, res);
    }
    return responseHomePage(res);
}).listen(http2Port, () => {
    console.log(`HTTP2 running at https://${hostname}:${http2Port}/`);
});

function responseFavIcon(res) {
    res.statusCode = 204;
    res.end();
}

function responseHomePage(res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let imageEl = '';
    // for (let i = 0; i < 379; i++) {
    //     if (i === 0) {
    //         imageEl += `<div class="row"><img width="32" height="32" src="/assets/tile-${i}.png"/>`
    //     } else if (i === 379) {
    //         imageEl += '</div>'
    //     } else if (i % 20 === 19) {
    //         imageEl += '</div><div class="row">'
    //     } else {
    //         imageEl += `<img width="32" height="32" src="/assets/tile-${i}.png"/>`
    //     }
    // }

    imageEl = '<img src="/assets/a1.jpg" style="max-width:100%;"><br/><img src="/assets/a2.jpg" style="max-width:100%;">'

    res.end(`<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="./static/main.css">
        </head>
        <body>
            <h2>GOGOGO</h2>
            <div>
                ${imageEl}
            </div>
            <script src="./static/main.js"></script>
        </body>
    </html>`);
}

function responseComparePage(res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res.end(`<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="./static/main.css">
        </head>
        <body>
            <div class="row"> 
                <div class="split">
                    <iframe src="https://www.ly.com:3443"></iframe>
                </div>
                <div class="split">
                    <iframe src="https://www.ly.com:3080"></iframe>
                </div>
            </div>
        </body>
    </html>`)
}

function responseImage(pathname, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');

    var rs = fs.createReadStream(path.join(__dirname, pathname))
    rs.pipe(res);
}

function responseJsFile(pathname, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/javascript');

    var rs = fs.createReadStream(path.join(__dirname, pathname))
    rs.pipe(res);
}

function responseCssFile(pathname, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');

    var rs = fs.createReadStream(path.join(__dirname, pathname))
    rs.pipe(res);
}