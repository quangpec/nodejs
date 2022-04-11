const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    console.log(result);
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  })
};
exports.postEditProduct = (req, res, next) => {
  const udateProduct = {
    id: req.body.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  }
  Product.findByPk(udateProduct.id).then(product => {
    product.title =udateProduct.title,
    product.imageUrl= udateProduct.imageUrl,
    product.price= udateProduct.price,
    product.description=udateProduct.description
    return product.save();
  }).then(result => {
    console.log('Update Product');
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
}
exports.postdeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.editProduct(id, [], true);
  res.redirect('/admin/products');
}
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findByPk(productId).then(product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  }).catch(err => { console.log(err) })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};
