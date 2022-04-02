const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
);

module.exports = class Card{
    static addTocard(id,price){
        fs.readFile(p,(err,fileConten)=>{
            let card = {product:[], totalprice : 0};
            if(!err){
                card = JSON.parse(fileConten);
                const exitingProductIndex = card.product.findIndex(product=>product.id ===id);
                const exitingProduct = card.product[exitingProductIndex];
                
                 let  updateProduct ;
                if (exitingProduct){
                    updateProduct  ={...exitingProduct };
                    updateProduct.qty = updateProduct.qty +1; 
                    card.product[exitingProductIndex] = updateProduct;
                } else {
                    updateProduct = {id: id,qty:1, price : price};
                    card.product =[...card.product, updateProduct];
                }
                card.totalprice = card.totalprice+ +price;
                fs.writeFile(p,JSON.stringify(card), err=>{
                    console.log(err);
                })
            } else
             console.log(err);
        })
    }
}