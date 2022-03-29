const path = require('path');
const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

const product = [];
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product',{pageTitle: 'Add product', path:'/admin/add-product', formsCSS : true, productCSS: true, activeAddProduct :true })
});
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  product.push({title: req.body.title});
  res.redirect('/');
});

module.exports.product = product;
module.exports.router = router;
