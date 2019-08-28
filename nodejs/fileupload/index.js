const http = require('http');
const url = require('url');
const fs = require('fs');
const formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname === '/favicon.ico') {
        return responseFavIcon(res);
    }
    if (pathname === '/submit') {
        return responseFormSubmit(req, res);
    }
    if (pathname === '/upload') {
        return responseFileUpload(req, res);
    }
    if (pathname === '/raw') {
        return responseRawUpload(req, res);
    }
    return responseHomePage(res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function responseFavIcon(res) {
    res.statusCode = 204;
    res.end();
}

function responseHomePage(res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <form method="post" action="/submit">
                <label>form submit</label>
                <input type="text" name="name"/>
                <br/>
                <input type="submit" value="Submit Form">
            </form>
            <form method="post" action="/upload" enctype="multipart/form-data">
                <div>file submit</div>
                <input type="text" name="name"/>
                <input type="file" name="image"/>
                <br/>
                <input type="submit" value="Submit File">
            </form>
            <div>
                <p>Ajax upload</p>
                <input id="file-input" type="file" name="file"/>
                <button id="file-submit">Upload</button>
            </div>
            <script>
                document.getElementById("file-submit").addEventListener("click", function(){
                    let inputEl = document.getElementById("file-input")
                    let formData = new FormData()
                    formData.append("name", "ajax-file")
                    formData.append("file", inputEl.files[0])

                    fetch("http://127.0.0.1:3000/upload", {
                        method:"POST",
                        body: formData
                    }).then((response)=>{
                        return response.json()
                    }).then((jsonData)=>{
                        console.log(jsonData)
                    }).catch((error)=>{
                        console.error('Error:', error)
                    })
                })
            </script>
        </body>
    </html>`);
}

function responseFormSubmit(req, res) {
    res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
    });
    res.end();
}

function responseFileUpload(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname

    form.parse(req, function (err, fields, files) {
        console.log(`fields:${JSON.stringify(fields)}`)
        console.log(`file keys:${JSON.stringify(Object.keys(files))}`)

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            code: 0,
            msg: 'success'
        }));
    });
}

function responseRawUpload(req, res) {
    const tmp = fs.createWriteStream("tmp.png");

    req.pipe(tmp).on('finish', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            code: 0,
            msg: 'success'
        }));
    });
}