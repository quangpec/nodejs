const http = require('http');
const server = http.createServer((req,res)=>{

    //console.log(req.url, req.method, req.headers);
    const url = req.url;
    if (url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method ="POST"><input type ="text" name = "message"></input><button type ="submit">send</button></form></body>');
        res.write('</html>');
        return res.end;
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    return res.end;
});
server.listen(3000);