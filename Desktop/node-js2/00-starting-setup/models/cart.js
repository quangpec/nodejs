const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
module.exports = class Cart{
    static addTocart(id,price){
        fs.readFile(p,(err,fileConten)=>{
            let cart = {product:[], totalprice : 0};
            if(!err){
                cart = JSON.parse(fileConten);
                const exitingProductIndex = cart.product.findIndex(product=>product.id ===id);
                const exitingProduct = cart.product[exitingProductIndex];
                
                 let  updateProduct ;
                if (exitingProduct){
                    updateProduct  ={...exitingProduct };
                    updateProduct.qty = updateProduct.qty +1; 
                    cart.product[exitingProductIndex] = updateProduct;
                } else {
                    updateProduct = {id: id,qty:1, price : price};
                    cart.product =[...cart.product, updateProduct];
                }
                cart.totalprice = cart.totalprice+ +price;
                fs.writeFile(p,JSON.stringify(cart), err=>{
                    console.log(err);
                })
            } else
             console.log(err);
        })
    }
    static deleteProduct(id){
        fs.readFile(p,(err,fileConten)=>{
            if(!err){
                const Cart = JSON.parse(fileConten);
                const cartIndex = Cart.product.findIndex(pr=>pr.id ===id);
                if (cartIndex.length===0){
                    return;
                }else{
                const productDel = Cart.product[cartIndex];
                Cart.totalprice = Cart.totalprice - productDel.price*productDel.qty;
                Cart.product.splice(cartIndex,1);
                fs.writeFile(p,JSON.stringify(Cart),err => {
                    
                })}   
             }
             else{
                 
             }
        })
    }
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}