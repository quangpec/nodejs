const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchProductId(productId, product => {
    if (product) {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/product'
      });
    } else {
      res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
    }
  });
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
