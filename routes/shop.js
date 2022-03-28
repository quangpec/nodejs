const express = require('express');
const router = express.Router();

router.use('/',(req,res,next) =>{
    console.log('This always runs!');
    next();// tiếp tục các middelware khác
   });

router.use('/',(req,res,next)=>{
    console.log('in another middelware!');
    res.send('<h1> Hello from next.js!</h1>');
});

module.exports = router;