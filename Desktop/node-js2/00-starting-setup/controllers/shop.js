const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  })
}
 
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then( ([rowId])=>{
    if(rowId.length>0){
    res.render('shop/product-detail', {
      product: rowId[0],
      pageTitle: rowId[0].title,
      path: '/product'
    });
  }
  else{
    next();
  }
  }

  ).catch(err => {
    console.log(err);
  });
  //res.redirect('/');
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll(cart => {
    Product.fetchAll(products => {
      const cartProduct = [];
      for (let product of products) {
        const cartProductdata = cart.product.find(prod => prod.id === product.id);
        if (cartProductdata) {
          cartProduct.push({ product: product, qty: cartProductdata.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProduct,
        totalPrice: cart.totalprice,
      });
    })
  })

};
exports.postCart = (req, res, next) => {
  const id = req.body.id;
  Product.fetchProductId(id, (product) => {
    Cart.addTocart(id, product.price);
  })
  res.redirect('/');
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
exports.PostdeleteCartItem = (req, res, next) => {
   const id = req.body.id;
   Cart.delete(id);
  res.redirect('/cart');
}
