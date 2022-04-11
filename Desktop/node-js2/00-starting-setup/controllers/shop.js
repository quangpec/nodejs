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
  Product.findAll({
    where:{
      id: productId,
    }
  }).then( product =>{
    res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/product'
        });
  })
  .catch(err => {
    console.log(err);
  })
  // Product.findByPk(productId).then(product=>{
  //   if(product){
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/product'
  //   });
  // }
  // else{
  //   next();
  // }
  // }

  // ).catch(err => {
  //   console.log(err);
  // });
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
  req.user.getCart().then(cart => {
    return cart.getProducts()
  })
  .then(products=>{
    console.log(products);
    res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            //totalPrice: cart.totalprice,
          });
  })
  .catch(err=>console.log(err))
  // Cart.fetchAll(cart => {
  //   Product.fetchAll(products => {
  //     const cartProduct = [];
  //     for (let product of products) {
  //       const cartProductdata = cart.product.find(prod => prod.id === product.id);
  //       if (cartProductdata) {
  //         cartProduct.push({ product: product, qty: cartProductdata.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProduct,
  //       totalPrice: cart.totalprice,
  //     });
  //   })
  // })

};

exports.postCart = (req, res, next) => {
  const prodId  = req.body.id;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

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
