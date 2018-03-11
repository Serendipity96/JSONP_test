var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8888;

if (!port) {
    console.log('请指定端口号，例如：\nnode server.js 8888 ');
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url;
    var queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var method = request.method;

    /******** 修改以下代码 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery);

    if (path === '/') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write('200 OK');
        response.end()
    } else if (path === '/pay') {
        let number = fs.readFileSync('./db', 'utf8');
        number = number-0+1;
        fs.writeFileSync('./db', number);
        let callback = query.callback;
        response.setHeader('Content-Type', 'application/javascript');
        response.write(`${callback}.call(undefined, ${number})`);
        response.end()
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write('呜呜呜 404');
        response.end()
    }

    /******** 修改以上代码 ************/
});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请在浏览器打开 http://localhost:' + port)


