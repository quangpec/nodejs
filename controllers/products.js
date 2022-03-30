
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',{
        pageTitle: 'Add product',
        path:'/admin/add-product',
        formsCSS : true, 
        productCSS: true, 
        activeAddProduct :true });
  };

  // /admin/add-product => POST
  exports.postAddProduct =  (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  };

  exports.getProducts = (req, res, next) => {
    //console.log(adminData.product);
    //const products = adminData.product;
    const products = Product.fetchAll();
    res.render('shop',{
        prods: products, 
        pageTitle: 'Shop', path :'/',
         hasProducts: products.length>0,
          productCSS: true,
          activeShop : true });
  }