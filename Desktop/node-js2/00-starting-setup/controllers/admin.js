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
  const product = new Product(title, imageUrl, description, price);
  product.save().then(
    res.redirect('/'))
    .catch(err=>{
    console.log(err);
  });
};
exports.postEditProduct=(req,res,next)=>{
  const product = {
    id: req.body.id,
    title : req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  }
  delProduct = false;
  Product.editProduct(product.id, product, false);
 res.redirect('/admin/products');

}
exports.postdeleteProduct=(req,res,next)=>{
  const id = req.body.id;
  Product.editProduct(id,[], true);
  res.redirect('/admin/products');
}
exports.getEditProduct =(req,res,next)=>{
const editMode = req.query.edit;
if(!editMode){
 return res.redirect('/');
}
const productId =req.params.productId;
Product.fetchProductId(productId, product =>{
  if(!product){
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product:product,
  });

})
  
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([row, fieldData])=>{
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
