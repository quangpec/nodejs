const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('in another middelware!');
    res.send('<h1> Hello from next.js!</h1>');
    next();
});

module.exports = router;