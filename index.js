var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 3000);



http.createServer(function(req, res) {
    var url =  (req.url == '/' ? './index.html' : '.'+req.url);
    fs.readFile(url, function(err, html) {
        if (err) {
            var message404 = "There is no such page! <a href='/'>Back to home page</a>"
            res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': message404.length})
            res.write(message404)
        } else {
            //res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length})
            if(req.url.indexOf('.html') != -1) {
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length})
            } else if(req.url.indexOf('.js') != -1) {
                res.writeHead(200, {'Content-Type': 'text/javascript', 'Content-Length': html.length})
            } else if(req.url.indexOf('.css') != -1) {
                res.writeHead(200, {'Content-Type': 'text/css', 'Content-Length': html.length})
            } else if(req.url.indexOf('.svg') != -1) {
                res.writeHead(200, {'Content-Type': 'image/svg+xml', 'Content-Length': html.length})
            }
            res.write(html)
        }
        res.end()
    })
}).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

/*
http.createServer(function(req, res) {
    var url = './' + (req.url == '/' ? 'index.html' : req.url)
    
    fs.readFile(req.url, function(err, html) {
        console.log('URL', url);
    console.log('req.url', req.url);
    console.log('err', err);
        if (err) {
            var message404 = "There is no such page! <a href='/'>Back to home page</a>"
            res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': message404.length})
            res.write(message404)
        } else {
            res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length})
            res.write(html)
        }
        res.end()
    })
}).listen(port); */