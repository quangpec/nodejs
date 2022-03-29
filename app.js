const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const routes = require('./routes');

const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminData.router);
app.use(shopRoutes);
app.use('/404',(req,res,next)=>{
    //console.log(path.join(__dirname,'views','404.html'));
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
 })
app.use((req,res,next)=>{
    res.redirect('/404');
})

const server = http.createServer(app);
//console.log(routes.somtext);
server.listen(3000);
