var http = require('http');

http.createServer(function(req, res)
{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
}).listen(2990);

console.log('Server started listening on localhost:3000; press Ctrl-C to terminate');
