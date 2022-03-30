
const products = [];

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
    products.push({title: req.body.title});
    res.redirect('/');
  };

  exports.getProducts = (req, res, next) => {
    //console.log(adminData.product);
    //const products = adminData.product;
    res.render('shop',{
        prods: products, 
        pageTitle: 'Shop', path :'/',
         hasProducts: products.length>0,
          productCSS: true,
          activeShop : true });
  }