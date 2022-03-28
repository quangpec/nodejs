// const path = require('path');
// const express = require('express');
// const router = express.Router();

// router.get('/',(req,res,next)=>{
//     console.log('in another middelware!');
//     res.sendFile(path.join(__dirname,'../','views','shop.html'));
// });

// module.exports = router;


const path = require('path');
const rootDir = require('../util/path');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
