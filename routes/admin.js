const path = require('path');
const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

const product = [];
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir,'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  product.push({title: req.body.title});
  res.redirect('/admin/add-product');
});

module.exports.product = product;
module.exports.router = router;
