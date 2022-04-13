const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;
class Product {
  constructor(title, price, description, imageUrl,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id =  new ObjectId(id)
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id:this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
  static findById(id){
    const db = getDb();
    return db
    .collection('products')
    .find()
    .toArray()
    .then(products =>{
      const product = products.filter(prod=> prod._id.toString() ===id);
      console.log(product);
      return product[0];
    })
    .catch(err=>console.log(err))
  }
}

module.exports = Product;
