const http = require('http');
//const routes = require('./routes');

const express = require('express');

const app = express();
app.use((req,res,next) =>{
 console.log('in the middelware!');
 next();// tiếp tục các middelware khác
});
app.use((req,res,next) =>{
    console.log('in another middelware!');
    res.send('<h1> Hello from next.js!</h1>');
   });
const server = http.createServer(app);
//console.log(routes.somtext);
server.listen(3000);
