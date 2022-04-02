const Product = require('../models/product');
const Card = require('../models/card');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProduct =(req,res,next)=>{
   const productId =req.params.productId;
   Product.fetchProductId(productId,product =>{
    if(product){
    res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/product'
  });
  } else{
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  }
   });
   //console.log(productId);
   //res.redirect('/');
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart=(req,res,next)=>{
 const id = req.body.id;
 console.log(id);
  Product.fetchProductId(id, (product) =>{
    console.log(product);
   Card.addTocard(id,product.price);
 })
  res.redirect('/card');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
