const http = require('http');
const bodyParser = require('body-parser');
//const routes = require('./routes');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/',(req,res,next) =>{
 console.log('This always runs!');
 next();// tiếp tục các middelware khác
});
app.use('/add-product',(req,res,next) =>{
    res.send('<form action = "/product" method ="POST"><input type ="text" name ="title"></input> <br> <input type ="text" name ="id"></input> <button type ="submit" >Add Product</button></form>');
    console.log('in another middelware!');
   
   });
app.use('/product',(req,res,next)=>{
 console.log(req.body);
 res.redirect('/');
})
app.use('/',(req,res,next)=>{
    
    console.log('in another middelware!');
    res.send('<h1> Hello from next.js!</h1>');

})
const server = http.createServer(app);
//console.log(routes.somtext);
server.listen(3000);
