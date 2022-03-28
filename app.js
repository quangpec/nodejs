const http = require('http');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const routes = require('./routes');

const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);
app.use(shopRoutes);
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>');
})
const server = http.createServer(app);
//console.log(routes.somtext);
server.listen(3000);
