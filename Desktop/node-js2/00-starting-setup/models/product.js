const fs = require('fs');
const path = require('path');
const Card = require('../models/card');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
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

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);  
  }
  static fetchProductId(id,cb){
    getProductsFromFile(products=>{
      const product = products.filter(products=>products.id ===id)[0];
        cb(product);
    });
  }
  static editProduct(id,product,delProduct){
      getProductsFromFile(products=>{
        const proIndex = products.findIndex(p=>p.id === id);
        if (!delProduct){
        products[proIndex] = product;
        }else{
          products.splice(proIndex,1);
          
        }
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
          if(!err){
            Card.deleteProduct(id);
          }
        });
      });  
  }

}
